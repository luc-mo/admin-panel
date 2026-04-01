import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'

export interface IHttpClient {
	client: AxiosInstance
	addAuthentication: (accessToken: string | null) => void
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

		return {
			client,
			addAuthentication,
		}
	},
}
