import { createProvider } from './utils/create-provider'
import { useProviders } from './utils/use-providers'

import { useAuth } from '@/application/auth/use-auth'
import { servicesProvider } from './services-provider'
import { routerProvider } from './router-provider'
import { toastProvider } from './toast-provider'
import type { ISession } from '@/domain/session'
import type { ICredentials } from '@/domain/credentials'

export interface IAuthContext {
	session: ISession
	loadings: {
		session: boolean
		logIn: boolean
		logOut: boolean
	}
	logIn: (credentials: ICredentials) => Promise<void>
	logOut: () => Promise<void>
}

export const authProvider = createProvider({
	providerName: 'AuthProvider',
	contextName: 'auth',
	useValue: (): IAuthContext => {
		const { services, router, toast } = useProviders([
			servicesProvider,
			routerProvider,
			toastProvider,
		])
		return useAuth({ services, router, toast })
	},
})
