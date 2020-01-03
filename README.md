# GraphQL-Prisma-React-NodeJS Project Boilerplate

A GraphQL, Prisma, ReactJS, NodeJS boilerplate with authentication setup

## Planned updates :crystal_ball:

### Server

- Add tests for `server`
- Add `eslint` lint check for `server`
- Passport authentication

### Client

_Work in progress..._

## Tech Stacks :computer:

- [nodejs](https://nodejs.org/en/)
- [graphql-yoga](https://github.com/prisma-labs/graphql-yoga)
- [prisma](https://github.com/prisma/prisma)
- [react](https://reactjs.org/)
- [react-admin](https://marmelab.com/react-admin/)
- [docker](https://www.docker.com/)

## Installation :tools:

You need to install the Prisma CLI

```
npm i -g prisma
```

## Usage :hammer:

```bash
git clone https://github.com/ngshiheng/graphql-prisma-react-js.git
```

Then change anything you want!

### Docker :whale:

```bash
- Run `./build.sh` to build new docker image
- Run `./run.sh` to run container from the newly built docker image
```

## Development :triangular_ruler:

### Server

```bash
cd server/
npm ci
npm run start
```

- Run `prisma deploy` and `prisma generate` every time you update the datamodel for prisma
- Run `./build.sh` to build new docker image
- Run `./run.sh` to run container from the newly built docker image

### Client

_Work in progress..._

## Contributing :construction_worker:

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### Steps

1. Fork this
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License :copyright:

Copyright 2020 Jerry Ng

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
