# GraphQL-Prisma-NodeJS Project Boilerplate
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/ngshiheng/graphql-prisma-nodejs/blob/master/LICENSE)

A GraphQL, Prisma, NodeJS boilerplate with authentication setup

**Coming features** :crystal_ball:

- [X] Add tests for `server`
- [ ] Setup Travis CI
- [ ] [passport](http://www.passportjs.org/)
- [ ] Add sample objects (Books & Authors)
- [ ] `TypeScript` support

**Future updates** 

- [react](https://reactjs.org/)
- [react-admin](https://marmelab.com/react-admin/)
- [material-ui](https://material-ui.com/)

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

#### Clone this repository to your local machine

```bash
git clone https://github.com/ngshiheng/graphql-prisma-react-js.git

# Create a new connection to a remote repository
git remote set-url origin git://new.url.here
```

#### Rename `.env.example` to `.env` and fill up the configuration respectively

#### Setup database with prisma

```bash
cd server/prisma/
prisma deploy
```

- For quick setup, choose `Demo server + MySQL database `option
- You need to configure your prisma endpoint accordingly
- Export your `PRISMA_ENDPOINT` inside your `bash_profile`/`bashrc`/environment variables

More information how to [set up Prisma](https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/)

## Development :triangular_ruler:

### Run development server locally

```bash
cd server/
npm ci
npm run start
```

- Run `prisma deploy` every time you update the datamodel for prisma

### Containerize your project with Docker :whale:

- Run `./build.sh` to build new docker image
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
