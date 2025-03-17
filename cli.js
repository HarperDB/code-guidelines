#!/usr/bin/env node

import path from 'path';
import { spawnSync } from 'child_process';

const [,, command, ...args] = process.argv;

const configs = {
	prettier: {
		command: 'prettier',
		args: ['--config', path.resolve(__dirname, 'prettier.config.js'), ...args],
	},
}

switch (command) {
	case 'prettier':
		spawnSync(configs.prettier.command, configs.prettier.args, { stdio: 'inherit' });
		break;
	default:
		console.error(`Unknown command: ${command}`);
		process.exit(1);
		break;
}