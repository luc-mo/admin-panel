import type { IProvider, IProvidersProps } from './types'

export function withProviders<
	Ps extends readonly IProvider<unknown>[],
	ComponentProps extends object = object,
>(providers: Ps, Component: React.FC<ComponentProps & IProvidersProps<Ps>>) {
	const buildInjector = (
		props: ComponentProps,
		index = 0,
		accumulator: Record<string, any> = {}
	) => {
		if (index === providers.length) {
			return <Component {...props} {...(accumulator as IProvidersProps<Ps>)} />
		}

		const CurrentProvider = providers[index]
		const Injector: React.FC = () => {
			const value = CurrentProvider.use()
			const newIndex = index + 1
			const newAccumulator = { ...accumulator, [CurrentProvider.contextName]: value }
			return buildInjector(props, newIndex, newAccumulator)
		}
		return <Injector />
	}

	return (props: ComponentProps) => {
		return providers.reduceRight(
			(children, { providerName, Provider }) => <Provider key={providerName}>{children}</Provider>,
			buildInjector(props)
		)
	}
}
