import { createContext, use } from 'react'
import type { IProvider } from './types'

interface ICreateProviderParams<S, C extends string> {
	providerName: string
	contextName: C
	useValue: () => S
}

export function createProvider<S extends object, C extends string>({
	providerName,
	contextName,
	useValue,
}: ICreateProviderParams<S, C>): IProvider<S, C> {
	const Context = createContext<S | null>(null)

	const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
		const value = useValue()
		return <Context.Provider value={value}>{children}</Context.Provider>
	}

	const useProvider = () => {
		const context = use(Context)
		if (context === null) {
			throw new Error(`The use of ${contextName} must be within a ${providerName}`)
		}
		return context
	}

	return {
		providerName,
		contextName,
		Context,
		Provider,
		use: useProvider,
	}
}
