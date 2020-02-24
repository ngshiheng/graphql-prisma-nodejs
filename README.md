<h1 align="center"><strong>GraphQL Prisma NodeJS Fullstack Boilerplate</strong></h1>

<br />

<div align="center"><img src="https://imgur.com/lIi4YrZ.png" /></div>

<div align="center"><strong>Just another GraphQL fullstack boilerplate (　-_･) ︻デ═一  ▸</strong></div>

<br />

# GraphQL-Prisma-NodeJS Project Boilerplate

[![Build Status](https://travis-ci.org/ngshiheng/graphql-prisma-nodejs.svg?branch=master)](https://travis-ci.org/ngshiheng/graphql-prisma-nodejs)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/ngshiheng/graphql-prisma-nodejs/blob/master/LICENSE)

A GraphQL, Prisma, NodeJS boilerplate with authentication setup

# Tech Stacks :computer:

- [nodejs](https://nodejs.org/en/)
- [graphql-yoga](https://github.com/prisma-labs/graphql-yoga)
- [prisma](https://github.com/prisma/prisma)
- [docker](https://www.docker.com/)
- [redis](https://redis.io)
- [react](https://reactjs.org/)
- [material-ui](https://material-ui.com/)

# Installation :nut_and_bolt:

You need to install the Prisma CLI

```
npm i -g prisma
```

# Usage :wrench:

## 1. Clone this repository to your local machine

```bash
git clone https://github.com/ngshiheng/graphql-prisma-react-js.git

# Create a new connection to a remote repository
git remote set-url origin git://new.url.here
```

## 2. Setup your environment variables

```bash
export PRISMA_ENDPOINT="https://xxx.xxx.xxx"
export SECRET="your-app-secret"
export ENDPOINT="/graphql"
export PORT=4000
export EXPIRY="12h"
```

## 3. Setup database with prisma

```bash
cd server/prisma/
prisma deploy
```

- For quick setup, choose `Demo server + MySQL database`option
- Set your prisma endpoint to `PRISMA_ENDPOINT` inside your `bash_profile` or `bashrc` or any environment variable of your system
- More information on [setting up Prisma](https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/)

# Development :triangular_ruler:

## Run development server locally

```bash
cd server/
npm ci
npm run start
```

- Run `prisma deploy` every time you update the datamodel for prisma

## Run with Docker :whale:

- Run `docker-compose up -d` to build & run this project in a docker container

**Optional:**

- Run `./build.sh` or `docker-compose build` to build a docker image
- Run `./run.sh` to run container from the newly built docker image

# Contributing :construction_worker:

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change

## Steps

1. Fork this
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
