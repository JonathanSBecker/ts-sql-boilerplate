# Boilerplate Service

## Table of Contents

- [Getting Started](#getting-started)
    - [Requirements](#requirements)
    - [Spinning it Up](#spinning-it-up)
        - [First Setup](#first-setup)
        - [Running](#running)
        - [Additional Commands](#additional-commands)
    - [Automated Tests](#automated-tests)
- [Working on the DB](#working-on-the-db)
    - [Commands](#commands)
- [Code Expectations](#code-expectations)

## Getting Started

### Requirements

- Node 20.17.0 or later

### Spinning it up

#### First Setup

- Run `npm install`
- Run `npx gts init`
- Start Docker
- Run `docker compose up`, once it's done and dbmate has finished its migrations, use ctrl+c
  or `docker compose down`
- Run `brew install mkcert` (This is to run HTTPS locally)
- Run `brew install nss` (This is to run HTTPS on FireFox locally)
- Run `mkcert -install`
- Run `mkcert localhost` put the key and cert in a directory in

#### Running

- Start Docker
- Use `npm run dev` to run the repo, this will initialize the database docker instance, update the
  database to the latest migration, then start
  the express server.

## Working on the DB

### Commands

- To manually start the database run `docker compose up`
- To manually stop the database run `docker compose down`
- To manually migrate the database run `npm run migrate`
- To connect to the database run `npm run sql-cli`
- To generate a new SQL file run `dbmate new <migration_name>`

