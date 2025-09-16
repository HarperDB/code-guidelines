# @harperdb/code-guidelines

This repository contains code guideline tools and configurations for the HarperDB organization.

> Currently exports shared configurations for Prettier, ESLint, and TS Node Type Checking. More tools will be added soon.

## Quick Start

1. `npm i --save-dev @harperdb/code-guidelines`

2. Add `"prettier": "@harperdb/code-guidelines/prettier"` to **package.json**.

3. Run `npx prettier .`

## Formatting

We use [Prettier](https://prettier.io/) for formatting. The default config is exported under the `/prettier` path (i.e. `@harperdb/code-guidelines/prettier`).

Review the [Sharing Configurations](https://prettier.io/docs/en/sharing-configurations) documentation for more information how to use or extend the base config.

## Linting

We use [ESLint](https://eslint.org/) to enforce code quality and integrate Prettier formatting. The default config is exported under the `/eslint` path (i.e. `@harperdb/code-guidelines/eslint`).

### Using the Harper ESLint Configuration

1. Install the required dependencies:

```bash
npm i --save-dev @harperdb/code-guidelines eslint eslint-config-prettier eslint-plugin-prettier
```

2. Add `"eslint": "@harperdb/code-guidelines/eslint"` to **package.json**.

3. Run ESLint:

```bash
npx eslint .
```

### Extending the Configuration

You can extend or override the base configuration by adding your own rules after importing the Harper config.

For more detailed information about extending configurations, see the [ESLint Configuration Files documentation](https://eslint.org/docs/latest/use/configure/configuration-files#extending-configurations).

1. Install the required dependencies:

```bash
npm i --save-dev @harperdb/code-guidelines eslint eslint-config-prettier eslint-plugin-prettier
```

2. Create an `eslint.config.mjs` file in your project root:

```javascript
import harperConfig from "@harperdb/code-guidelines/eslint.config.mjs";

export default [
  ...harperConfig,
  // Your custom configuration here
  {
    rules: {
      // Override or add custom rules
    },
  },
];
```

3. Run ESLint:

```bash
npx eslint .
```

## Type Checking

TypeScript configuration files are available under the `/tsconfig` export path and can be used with the `extends` property in your own `tsconfig.json` files.

For example, to use the base Node.js configuration (supporting Node.js v20 or later):

1. Start by installing necessary dev dependencies:

```bash
   npm i --save-dev typescript @types/node@20 @harperdb/code-guidelines
```

2. Then create a `tsconfig.json` file in your project with the following content:

```json
{
  "extends": "@harperdb/code-guidelines/tsconfig.node.json",
  "compilerOptions": {
    // Your custom options here
  }
}
```

3. Finally, use TypeScript or Node.js Type Stripping!

```bash
   npx tsc
   # or
   node src/index.ts
```

Configurations are based off of the popular [tsconfig bases](https://github.com/tsconfig/bases) project.

The following list outlines the available configurations:

- `tsconfig.node.json` - Node.js v20 or later with Node.js Type Stripping support
- _More coming soon!_

### Adding new configurations

To add a new TypeScript configuration:

1. Create a new file in this repository starting with `tsconfig.` and ending with `.json`. The name in between should be descriptive of the environment or relevant version (e.g. `tsconfig.react.json` or `tsconfig.node-24.json`).
2. Update the `exports` field in `package.json` to include the new configuration file using the same name as the file.
3. Add it to the list above with a brief description.
4. Ship it 🚀
