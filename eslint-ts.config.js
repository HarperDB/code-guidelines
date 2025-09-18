import { defineConfig } from 'eslint/config';
import harperBaseConfig from './eslint.config.js';

export default defineConfig(harperBaseConfig, tseslint.configs.recommended);
