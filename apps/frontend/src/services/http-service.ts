import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'

const _addAuthentication = (client: AxiosInstance, accessToken: string | null) => {
	if (!accessToken) return
	client.interceptors.request.use((config) => {
		config.headers.Authorization = `Bearer ${accessToken}`
		return config
	})
}

const create = (config: CreateAxiosDefaults) => {
	const client = axios.create(config)
	return {
		client,
		addAuthentication: (accessToken: string | null) => _addAuthentication(client, accessToken),
	}
}

export const httpService = { create }
