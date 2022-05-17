Pantheon Decoupled 

[Example](#example)
[Example2](#example2)
[Third Example](#third-example)
[Fourth Example](#fourth-examplehttpwwwfourthexamplecom)



# Pantheon Systems Decoupled Kits

[![CircleCI](https://circleci.com/gh/pantheon-systems/decoupled-kit-js/tree/canary.svg?style=svg)](https://circleci.com/gh/pantheon-systems/decoupled-kit-js/tree/canary)

## Prerequisites

To configure the monorepo for development the following should be installed locally:

1. Nodejs version 16 LTS. We recomemnd using [nvm](https://github.com/nvm-sh/nvm)
1. npm version 8.x.x
1. The latest version of [pnpm](https://pnpm.io/installation)

    We recommend using npm. Use the following command to install:

    ```bash
    npm install -g pnpm@6.32.6
    ```

## Getting Started

1. Fork [this](https://github.com/pantheon-systems/decoupled-kit-js/fork) repo.
1. Clone your fork to your local machine.
1. Install dependencies for all packages and starters using the following command:
   ```
   pnpm install
   ```
1. Install the [husky pre-commit hooks](https://github.com/pantheon-systems/decoupled-kit-js/blob/canary/.husky/pre-commit). Run the following command:
   ```
   pnpm husky install
   ```

### Useful Scripts

There are several scripts you can use on your monorepo.

- Test all projects in the monorepo that have a test script:
  ```bash
  pnpm test
  ```
- Build all packages in the monorepo:
  ```bash
  pnpm build:pkgs
  ```
- Build all starters in the monorepo:
  ```bash
  pnpm build:starters
  ```
- Build all projects in the monorepo:
  ```bash
  pnpm build:all
  ```

 - Run commands in a targeted project, folder, or workspace, using the `pnpm` [filter flag](https://pnpm.io/filtering).

   For example, to start the Gatsby starter from the root of the monorepo (filter by namespace):

    ```bash
    pnpm --filter ./starters/gatsby-wordpress-starter' develop
    ```

 - Lint in the starters and filter by directory:

    ```bash
    pnpm --filter ./starters lint
    ```

-  Run documentation:

    ```bash
    pnpm --filter ./web start
    ```

## Bug Reports and Feature Requests

[Open a bug report here](https://github.com/pantheon-systems/decoupled-kit-js/issues/new?template=bug-report-template.yml)

[Open a feature request here](https://github.com/pantheon-systems/decoupled-kit-js/issues/new?template=feature-request-template.yml)

## Versions and Releases

### Generating a Changeset

Generate a new changeset, run `pnpm changeset` in the root of the repository. The generated markdown files in the `.changeset` directory should be committed to the repository.

### Creating a New Version

- Run `pnpm changeset version`. This will bump the versions of the packages previously specified with pnpm changeset (and any dependents of those) and update the changelog files.
- Run `pnpm install`. This will update the lockfile and rebuild packages.
- Commit the changes.

### Publishing a New Version

- Confirm your publishing scope by running the following command in `pantheon-systems`:
  ```
  pnpm config get scope
  ``` 
  Alternatively, you can use the command `pnpm config set scope @pantheon-systems`.
  
- To publish all public packages that have bumped versions not yet present in the registry, use the following command:
  ```
  pnpm publish -r --access public
  ```

### Further Reading

For more information on contributing to this project, see [CONTRIBUTING.md](./CONTRIBUTING.md)
