import { useMemo } from 'react'
import { useProviders } from '@/providers/utils/use-providers'
import { configProvider } from '@/providers/config-provider'
import { authProvider } from '@/providers/auth-provider'
import { servicesProvider } from '@/providers/services-provider'

export const useHttpClient = () => {
	const { config, services, auth } = useProviders([configProvider, servicesProvider, authProvider])

	const client = useMemo(() => {
		const httpService = services.http.create({
			baseURL: config.app.apiBaseUrl,
			headers: { 'Content-Type': 'application/json' },
		})
		httpService.addAuthentication(auth.session.accessToken)
		return httpService.client
	}, [config.app.apiBaseUrl, services.http.create, auth.session.accessToken])

	return client
}
