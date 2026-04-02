import type { IProvider } from './types'

export function withProviders<
	Ps extends readonly IProvider<unknown>[],
	ComponentProps extends object = object,
>(providers: Ps, Component: React.FC<ComponentProps>) {
	return (props: ComponentProps) => {
		return providers.reduceRight(
			(children, { providerName, Provider }) => <Provider key={providerName}>{children}</Provider>,
			<Component {...props} />
		)
	}
}
