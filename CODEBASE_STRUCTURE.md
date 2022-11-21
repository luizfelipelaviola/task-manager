# Codebase Structure

.github: contains all the files related to GitHub, such as issue templates, pull request templates, and GitHub Actions
.husky: git hooks (please do not edit without using Husky CLI)
.vscode: vscode configuration
prisma: contains all the files related to the database managed by Prisma
src: contains all the files related to the application
src/_\_tests__: integration tests
src/@types: global type definitions
src/config: configuration files
src/modules: contains parts of the software
src/modules/<< name >>: contains a part of the software, guided by DDD pattern
src/modules/<< name >>/dtos: data transfer objects
src/modules/<< name >>/entities: entities
src/modules/<< name >>/infra: module infrastructure (http, ws, database, ORM, and others)
src/modules/<< name >>/repositories: data repositories interfaces for dependency inversion (DDD)
src/modules/<< name >>/schemas: user input validation schemas
src/modules/<< name >>/services: service files
src/modules/<< name >>/views: view files
src/shared: contains the high level of the app
src/shared/container: contains the providers to dependency injection
src/shared/providers/<< name >>: provider root folder
src/shared/providers/<< name >>/implementations: provider implementation
src/shared/providers/<< name >>/mocks: fake provider for testing purposes
src/shared/errors: controlled/forced exceptions
src/shared/i18n: i18n configuration and translation packages
src/shared/infra/http: contains the app starter, brain of application
src/shared/infra/graphql: contains the graphql server
src/shared/infra/http/middlewares: global middlewares
src/shared/infra/http/routes: global router which joins all modules into once
src/shared/types: global types and interfaces
src/shared/util: utility functions
