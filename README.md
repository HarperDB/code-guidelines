# @harperdb/code-guidelines

This repository contains code guideline tools and configurations for the HarperDB organization.

> Currently this only exports a shared Prettier configuration. More tools will be added soon.

## Quick Start

1. `npm i --save-dev @harperdb/code-guidelines`

2. Add `"prettier": "@harperdb/code-guidelines/prettier"` to **package.json**.

3. Run `npx prettier .`

## Formatting

We use [Prettier](https://prettier.io/) for formatting. The default config is exported under the `/prettier` path (i.e. `@harperdb/code-guidelines/prettier`).

Review the [Sharing Configurations](https://prettier.io/docs/en/sharing-configurations) documentation for more information how to use or extend the base config.

## Linting

> Coming soon!

## Type Checking

We use [TypeScript](https://www.typescriptlang.org/) for type checking.

TypeScript configuration files will be available under the `/tsconfig` export path and can be used with the `extends` property in your own `tsconfig.json` files.

For example, to use the base Node.js configuration (supporting Node.js v20 or later):

1. Start by installing necessary dev dependencies:
   ```bash
   npm i --save-dev typescript @types/node@20 @harperdb/code-guidelines
   ```
2. Then create a `tsconfig.json` file in your project root with the following content:
   ```json
   {
   	"extends": "@harperdb/code-guidelines/tsconfig/node",
   	"compilerOptions": {
   		// Your custom options here
   	}
   }
   ```

We use nested paths for different environments and versions.

Configurations are based off of the popular [tsconfig bases](https://github.com/tsconfig/bases) project.

The following list outlines the available configurations:

- `/tsconfig/node` - Node.js v20 or later
- _More coming soon!_
