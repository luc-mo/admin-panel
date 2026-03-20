import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	tsconfig: './tsconfig.json',
	minify: false,
	clean: true,
	treeshake: true,
	dts: true,
})
