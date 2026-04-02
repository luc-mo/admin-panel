import { useMemo } from 'react'
import { createProvider } from './utils/create-provider'
import { useProviders } from './utils/use-providers'

import { configProvider } from './config-provider'
import { servicesProvider } from './services-provider'
import { authProvider } from './auth-provider'
import { UsersService } from '@/infrastructure/services/api/users-service'

export interface ICoreServicesContext {
	usersService: UsersService
}

export const coreServicesProvider = createProvider({
	providerName: 'CoreServicesProvider',
	contextName: 'coreServices',
	useValue: () => {
		const { config, services, auth } = useProviders([
			configProvider,
			servicesProvider,
			authProvider,
		])

		const http = useMemo(() => {
			const baseURL = config.app.apiBaseUrl
			const httpClient = services.http.create({ baseURL })
			httpClient.addAuthentication(auth.session.accessToken)
			httpClient.addRetryOnExpiration(
				() => auth.getAccessToken(true),
				() => auth.forceLogOut()
			)
			return httpClient
		}, [auth.session.accessToken])

		const usersService = useMemo(() => new UsersService({ http }), [http])

		return { usersService }
	},
})
