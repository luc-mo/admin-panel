import { readFileSync, writeFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))
packageJson.devDependencies = {
	'@princesitas/core': 'workspace:*',
	...packageJson.devDependencies,
}

writeFileSync('./package.json', `${JSON.stringify(packageJson, null, '\t')}\n`)
