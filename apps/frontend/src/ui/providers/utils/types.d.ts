export interface IProvider<out S, C extends string = string> {
	providerName: string
	contextName: C
	Context: React.Context<S | null>
	Provider: React.FC<React.PropsWithChildren>
	use: () => S
}

export type IProvidersProps<T extends readonly IProvider<unknown>[]> = {
	[P in T[number] as P['contextName']]: P extends IProvider<infer S> ? S : never
}
