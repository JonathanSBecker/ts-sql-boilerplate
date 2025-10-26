#!/bin/bash

cd "$(dirname "$0")/.." || exit

if ! [ -x "$(command -v jq)" ]; then
  echo "jq is not installed. Attempting to install jq..."

  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    if command -v apt-get >/dev/null 2>&1; then
      sudo apt-get update
      sudo apt-get install -y jq
    elif command -v dnf >/dev/null 2>&1; then
      sudo dnf install -y jq
    elif command -v yum >/dev/null 2>&1; then
      sudo yum install -y jq
    else
      echo "jq could not be installed. No supported package manager found (apt/dnf/yum)."
      exit 1
    fi
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v brew >/dev/null 2>&1; then
      brew install jq
    else
      echo "Homebrew is not installed. Please install Homebrew or install jq manually."
      exit 1
    fi
  elif [[ "$OSTYPE" == "msys"* ]] || [[ "$OSTYPE" == "cygwin"* ]] || [[ "$OSTYPE" == "win32"* ]]; then
    if command -v choco >/dev/null 2>&1; then
      echo "Installing jq via Chocolatey..."
      choco install jq -y
    elif command -v scoop >/dev/null 2>&1; then
      echo "Installing jq via Scoop..."
      scoop install jq
    else
      echo "Windows detected but no supported package manager found (Chocolatey or Scoop). Please install jq manually."
      exit 1
    fi
  else
    echo "jq could not be installed. Supported systems are MacOS, Linux, and Windows."
    exit 1
  fi
fi

if ! [ -x "$(command -v jq)" ]; then
  echo "jq could not be installed. The script cannot continue."
  exit 1
fi

APIDOC_JSON_PATH="./apidoc.json"

echo "Current version:"
jq -r '.version' $APIDOC_JSON_PATH

echo "Please enter the version section you would want to increment [major, minor, patch, skip]: "
read -r version_section

case $version_section in
    "major")
        NEW_VERSION=$(jq -r '.version' $APIDOC_JSON_PATH | awk -F. -v OFS=. '{$1++ ; $2=0 ; $3=0 ; print}')
        ;;
    "minor")
        NEW_VERSION=$(jq -r '.version' $APIDOC_JSON_PATH | awk -F. -v OFS=. '{$2++ ; $3=0 ; print}')
        ;;
    "patch")
        NEW_VERSION=$(jq -r '.version' $APIDOC_JSON_PATH | awk -F. -v OFS=. '{$3++ ; print}')
        ;;
    "skip")
        NEW_VERSION=$(jq -r '.version' $APIDOC_JSON_PATH)
        ;;
    *)
        echo "Invalid input! Please enter 'major', 'minor', 'patch' or 'skip'."
        exit 1
        ;;
esac

jq ".version = \"$NEW_VERSION\"" $APIDOC_JSON_PATH > temp.json && mv temp.json $APIDOC_JSON_PATH

echo "Updated version:"
jq -r '.version' $APIDOC_JSON_PATH

npx apidoc -i src/ -o doc/
