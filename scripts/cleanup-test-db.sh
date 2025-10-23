#!/bin/bash

mysql -h test-db -P 3306 -u gemini -pP0werOverwhelm!ng -Nse 'show tables' boilerplate_test | while read -r table; do mysql -h
