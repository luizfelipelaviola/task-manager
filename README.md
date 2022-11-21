<h1 align="center">Task Manager API</h1>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Contributing and Coworking](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)
- [Codebase Structure](./docs/CODEBASE_STRUCTURE.md)
- [Code Guidelines](./docs/CODE_GUIDELINES.md)

## 📖 About <a name = "about"></a>

This repository contains the API for the Task Manager application.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

- [Docker and docker-compose](https://docs.docker.com/get-docker/)
- [Node.js 16.18.0+ (LTS version is recommended)](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Installing

Clone this repository on your local machine. After completed the requirements, including Node.js installation, first you'll need to install all application dependencies (node_modules), you can choose the tool (e.g. Yarn, NPM).

In this example, we will be using Yarn instead of NPM.

```bash
yarn
```

Next, run the application using

```bash
docker compose up -d
```

## 🔧 Running the tests <a name = "tests"></a>

To run tests, please execute the command below:
```bash
yarn test
```

Code coverage will be generated on \_\_tests\_\_ page

## 📱 Usage <a name="usage"></a>

Run this application on docker compose and access it from localhost:3333

## 🚀 Deployment <a name = "deployment"></a>

This application is ready for Docker and docker compose deployment.

To backend deployment on a Virtual Machine, make a clone of this repository on the target, select the desired branch, and, after completing the requirements, run the following commands:

```bash
docker compose build
```

Once the application was built, fill ```docker-compose.yml``` with your environment variables and run the following command:

```bash
docker compose up -d
```

Make sure that your Firewalls, Load Balancers and your DNS are well configured. The backend application will be provided at port 3333 by default.

## ⛏️ Built Using <a name = "built_using"></a>

### Backend

- [Node](https://nodejs.org/) - Platform
- [Express](https://expressjs.com/) - Framework
- [Tsrynge](https://github.com/microsoft/tsyringe) - Dependency injection
- [Prisma](https://www.prisma.io/) - ORM
- [TypeScript](https://www.typescriptlang.org/) - Javascript with syntax for types
- [GraphQL](https://axios-http.com/) - API Query Language
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - GraphQL Server
- [TypeGraphQL](https://typegraphql.com/) - GraphQL with Typescript
- [Jest](https://jestjs.io/) - Testing framework

### General

It's important to mention this tools/patterns which guides the application lifecycle:

- [Git](https://git-scm.com/) - Version control
- [Husky](https://typicode.github.io/husky/#/) - Git hooks
- [Lint Staged](https://github.com/okonet/lint-staged) - Tool to lint commit staged files
- [Commitizen](https://github.com/commitizen/cz-cli) - Git commit message helper
- [Commitlint](https://commitlint.js.org/) - Git commit message linter
- [Standard Version](https://github.com/conventional-changelog/standard-version) - Changelog generator
- [Eslint](https://eslint.org/) - Linter framework
- [Prettier](https://prettier.io/) - Code formatter
- [Semver](https://semver.org/) - Semantic versioning
