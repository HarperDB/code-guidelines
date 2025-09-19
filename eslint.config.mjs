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
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		...js.configs.recommended,
		languageOptions: {
			sourceType: 'module',
		},
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

	// TypeScript configuration (only applies to TS files)
	...tseslint.configs.recommended.rules,
	...tseslint.configs.recommendedTypeChecked.rules,
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		rules: {
			// TypeScript-specific overrides
			'@typescript-eslint/no-undef': 'off', // disable no-undef as it doesn't work well with Harper's global variables
			'@typescript-eslint/no-console': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/eqeqeq': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
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
		rules: {},
	},
]);
