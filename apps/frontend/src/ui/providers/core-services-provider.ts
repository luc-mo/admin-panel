import { useMemo } from 'react'
import { createProvider } from './utils/create-provider'
import { useProviders } from './utils/use-providers'

import { configProvider } from './config-provider'
import { servicesProvider } from './services-provider'
import { authProvider } from './auth-provider'
import { UserService } from '@/infrastructure/services/api/user-service'

export interface ICoreServicesContext {
	userService: UserService
}

export const coreServicesProvider = createProvider({
	providerName: 'CoreServicesProvider',
	contextName: 'coreServices',
	useValue: (): ICoreServicesContext => {
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

		const userService = useMemo(() => new UserService({ http }), [http])

		return { userService }
	},
})
