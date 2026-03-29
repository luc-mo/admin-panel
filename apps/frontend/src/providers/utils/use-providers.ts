import type { IProvider, IProvidersProps } from './types'

export function useProviders<Ps extends readonly IProvider<unknown>[]>(
	providers: Ps
): IProvidersProps<Ps> {
	return Object.fromEntries(
		providers.map((provider) => [provider.contextName, provider.use()])
	) as IProvidersProps<Ps>
}
