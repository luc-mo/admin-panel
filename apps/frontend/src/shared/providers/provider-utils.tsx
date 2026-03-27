import { createContext, use } from 'react'

export interface IProvider<S> {
	name: string
	Context: React.Context<S | null>
	Provider: React.FC<React.PropsWithChildren>
	use: () => S
}

export function createProvider<S extends object>(name: string, useValue: () => S): IProvider<S> {
	const Context = createContext<S | null>(null)

	const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
		const value = useValue()
		return <Context.Provider value={value}>{children}</Context.Provider>
	}

	const useProvider = () => {
		const context = use(Context)
		if (context === null) {
			throw new Error(`use${name} must be used within a ${name}Provider`)
		}
		return context
	}

	return {
		name,
		Context,
		Provider,
		use: useProvider,
	}
}

export function withProviders<C extends React.ComponentType<any>, P extends IProvider<any>>(
	Component: C,
	providers: P[]
): React.FC<React.ComponentProps<C>> {
	return (props: React.ComponentProps<C>) => {
		return providers.reduceRight(
			(children, { name, Provider }) => <Provider key={name}>{children}</Provider>,
			<Component {...props} />
		)
	}
}
