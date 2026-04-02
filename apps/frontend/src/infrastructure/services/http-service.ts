import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'

export interface IHttpClient {
	client: AxiosInstance
	addAuthentication: (accessToken: string | null) => void
	addRetryOnExpiration: (
		getToken: () => Promise<string | null>,
		onRefreshFailure: () => void
	) => void
}

export const httpService = {
	create: (config: CreateAxiosDefaults): IHttpClient => {
		const client = axios.create(config)

		const addAuthentication = (accessToken: string | null) => {
			if (!accessToken) return
			client.interceptors.request.use((config) => {
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
							request.headers.Authorization = `Bearer ${accessToken}`
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
