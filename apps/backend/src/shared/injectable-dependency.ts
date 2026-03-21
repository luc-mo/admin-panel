import type { IContainer } from '@/types/container'

export function InjectableDependency<Keys extends keyof IContainer>(...keys: Keys[]) {
	type IDependencies = Pick<IContainer, Keys>

	type IPrefixed<T extends Record<string, any>> = {
		readonly [K in keyof T as `_${string & K}`]: T[K]
	}

	abstract class Base {
		constructor(dependencies: IDependencies) {
			for (const key of keys) {
				;(this as any)[`_${String(key)}`] = dependencies[key]
			}
		}
	}

	return Base as abstract new (
		dependencies: IDependencies
	) => IPrefixed<IDependencies>
}
