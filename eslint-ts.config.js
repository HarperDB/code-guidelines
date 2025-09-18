import { defineConfig } from 'eslint/config';
import harperBaseConfig from './eslint.config.js';
import tseslint from 'typescript-eslint';

export default defineConfig(harperBaseConfig, tseslint.configs.recommended);
