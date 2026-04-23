import { readFileSync, writeFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))
const { '@admin-panel/core': _, ...rest } = packageJson.devDependencies
packageJson.devDependencies = rest

writeFileSync('./package.json', `${JSON.stringify(packageJson, null, '\t')}\n`)
