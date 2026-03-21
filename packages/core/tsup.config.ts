import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	tsconfig: './tsconfig.json',
	format: ['cjs', 'esm'],
	minify: false,
	clean: true,
	treeshake: true,
	dts: true,
})
