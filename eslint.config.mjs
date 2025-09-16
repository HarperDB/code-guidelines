import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Global ignores
  {
    ignores: ["node_modules/**"],
  },

  // ESLint recommended rules
  eslint.configs.recommended,

  // Prettier plugin and config
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Run prettier as an ESLint rule, using Harper config
      "prettier/prettier": [
        "warn",
        {},
        { usePrettierrc: "./prettier.config.js" },
      ],
    },
  },

  // Disable conflicting ESLint formatting rules
  prettier,

  // Optional additional rules
  {
    rules: {
      eqeqeq: "warn",
      "no-undef": "off", // disable no-undef as it doesn't work well with Harper's global variables
    },
  },
]);
