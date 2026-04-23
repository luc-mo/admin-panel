import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm'],
	outExtension: () => ({ js: '.js' }),
	tsconfig: './tsconfig.json',
	minify: false,
	clean: true,
	treeshake: true,
	noExternal: ['@princesitas/core'],
})
