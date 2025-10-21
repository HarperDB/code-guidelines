import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import path from 'path';
import { fileURLToPath } from 'url';
import tseslint from 'typescript-eslint';

// Get __dirname for prettier config import
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
	// Global ignores
	{
		ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '.git/**'],
	},

	// JavaScript configuration (only applies to JS files)
	{
		files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
		...js.configs.recommended,
		languageOptions: {
			sourceType: 'module',
		},
		rules: {}, // Include additional JS-specific rules here
	},

	// TypeScript configuration (only applies to TS files)
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
		extends: [...tseslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				sourceType: 'module',
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		rules: {
			// TypeScript-specific overrides
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/no-explicit-any': 'off',

			// Turn off errors for Harper global typing
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
		},
	},

	// Prettier plugin and config
	{
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			// Run prettier as an ESLint rule, using Harper config
			'prettier/prettier': [
				'warn',
				await import(path.resolve(__dirname, './prettier.config.js')).then((m) => m.default),
			],
		},
	},

	// Disable conflicting ESLint formatting rules
	prettier,

	// Optional additional rules
	{
		rules: {
			'no-undef': 'off', // disable no-undef as it doesn't work well with Harper's global variables
			'no-console': 'off',
			'eqeqeq': 'warn',
			'no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
		},
	},
]);
