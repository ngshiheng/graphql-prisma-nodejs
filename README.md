# GraphQL-Prisma-NodeJS Project Boilerplate
[![Build Status](https://travis-ci.org/ngshiheng/graphql-prisma-nodejs.svg?branch=master)](https://travis-ci.org/ngshiheng/graphql-prisma-nodejs)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/ngshiheng/graphql-prisma-nodejs/blob/master/LICENSE)

A GraphQL, Prisma, NodeJS boilerplate with authentication setup

**Features** 

- [X] Integration and E2E test examples
- [X] Travis CI
- [ ] [passport](http://www.passportjs.org/)
- [ ] Add sample objects (Books & Authors)
- [ ] `TypeScript` support

## Tech Stacks :computer:

- [nodejs](https://nodejs.org/en/)
- [graphql-yoga](https://github.com/prisma-labs/graphql-yoga)
- [prisma](https://github.com/prisma/prisma)
- [docker](https://www.docker.com/)

## Installation :nut_and_bolt:

You need to install the Prisma CLI

```
npm i -g prisma
```

## Usage :wrench:

#### 1. Clone this repository to your local machine

```bash
git clone https://github.com/ngshiheng/graphql-prisma-react-js.git

# Create a new connection to a remote repository
git remote set-url origin git://new.url.here
```

#### 2. Setup your environment variables

```bash
export PRISMA_ENDPOINT="https://xxx.xxx.xxx"
export SECRET="your-app-secret"
export ENDPOINT="/graphql"
export PORT=4000
export EXPIRY="12h"
```

#### 3. Setup database with prisma

```bash
cd server/prisma/
prisma deploy
```

- For quick setup, choose `Demo server + MySQL database `option
- Set your prisma endpoint to `PRISMA_ENDPOINT` inside your `bash_profile` or `bashrc` or any environment variable of your system
- More information on [setting up Prisma](https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/)

## Development :triangular_ruler:

### Run development server locally

```bash
cd server/
npm ci
npm run start
```

- Run `prisma deploy` every time you update the datamodel for prisma

### Docker :whale:

- Run `docker-compose up -d` to build & run this project in a docker container

**Optional:**
- Run `./build.sh` or `docker-compose build` to build a docker image
- Run `./run.sh` to run container from the newly built docker image

## Contributing :construction_worker:

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change

### Steps

1. Fork this
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License :copyright:

Copyright 2020 GraphQL Prisma NodeJS Project Boilerplate

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
