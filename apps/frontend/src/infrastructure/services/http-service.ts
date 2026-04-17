import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'

export interface IHttpService {
	client: AxiosInstance
	addAuthentication: (getToken: () => string | null) => void
	addRetryOnExpiration: (
		getToken: () => Promise<string | null>,
		onRefreshFailure: () => void
	) => void
}

export const httpService = {
	create: (config: CreateAxiosDefaults): IHttpService => {
		const client = axios.create(config)
		let authInterceptorId: number | null = null

		const addAuthentication = (getToken: () => string | null) => {
			const accessToken = getToken()
			if (!accessToken) return

			if (authInterceptorId !== null) {
				client.interceptors.request.eject(authInterceptorId)
			}
			authInterceptorId = client.interceptors.request.use((config) => {
				config.headers.Authorization = `Bearer ${accessToken}`
				return config
			})
		}

		const addRetryOnExpiration = (
			getToken: () => Promise<string | null>,
			onRefreshFailure: () => void
		) => {
			client.interceptors.response.use(
				(response) => response,
				async (error) => {
					if (axios.isAxiosError(error) && error.response?.status === 401 && error.config) {
						try {
							const accessToken = await getToken()
							if (!accessToken) {
								onRefreshFailure()
								return Promise.reject(error)
							}
							const request = error.config
							addAuthentication(() => accessToken)
							return client(request)
						} catch {
							onRefreshFailure()
							return Promise.reject(error)
						}
					}
					return Promise.reject(error)
				}
			)
		}

		return {
			client,
			addAuthentication,
			addRetryOnExpiration,
		}
	},
}
