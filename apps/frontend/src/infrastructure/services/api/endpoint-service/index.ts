import type { IEndpoint, IJsonEndpoint } from '@admin-panel/core'
import type { IHttpService } from '@/infrastructure/services/http-service'
import type {
	IFindEndpoints,
	IFindEndpointById,
	ICreateEndpoint,
	IUpdateEndpoint,
	IRemoveEndpoint,
} from './types'

export class EndpointService {
	private readonly _http: IHttpService

	constructor({ http }: IDependencies) {
		this._http = http
	}

	public async find(params: IFindEndpoints['request']) {
		const response = await this._http.client.get<IFindEndpoints['response']>('/endpoints', {
			params,
		})
		const endpoints = response.data.data.map(this._parseEndpoint)
		return {
			data: endpoints,
			limit: response.data.limit,
			offset: response.data.offset,
			total: response.data.total,
		}
	}

	public async findById(params: IFindEndpointById['request']) {
		const url = `/endpoints/${params.id}`
		const response = await this._http.client.get<IFindEndpointById['response']>(url)
		const endpoint = this._parseEndpoint(response.data.data)
		return { data: endpoint }
	}

	public async create(params: ICreateEndpoint['request']) {
		const response = await this._http.client.post<ICreateEndpoint['response']>('/endpoints', params)
		const endpoint = this._parseEndpoint(response.data.data)
		return {
			data: endpoint,
			message: response.data.message,
		}
	}

	public async update(params: IUpdateEndpoint['request']) {
		const url = `/endpoints/${params.id}`
		const response = await this._http.client.patch<IUpdateEndpoint['response']>(url, params)
		const endpoint = this._parseEndpoint(response.data.data)
		return {
			data: endpoint,
			message: response.data.message,
		}
	}

	public async remove(params: IRemoveEndpoint['request']) {
		const url = `/endpoints/${params.id}`
		const response = await this._http.client.delete<IRemoveEndpoint['response']>(url)
		const endpoint = this._parseEndpoint(response.data.data)
		return {
			data: endpoint,
			message: response.data.message,
		}
	}

	private _parseEndpoint(endpoint: IJsonEndpoint): IEndpoint {
		return {
			id: endpoint.id,
			method: endpoint.method,
			path: endpoint.path,
			roles: endpoint.roles,
			createdAt: new Date(endpoint.createdAt),
			updatedAt: new Date(endpoint.updatedAt),
		}
	}
}

interface IDependencies {
	http: IHttpService
}
