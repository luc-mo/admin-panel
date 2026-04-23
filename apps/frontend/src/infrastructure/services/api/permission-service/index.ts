import type { IPermission, IJsonPermission } from '@admin-panel/core'
import type { IHttpService } from '@/infrastructure/services/http-service'
import type {
	IFindPermissions,
	IFindAllPermissions,
	IFindPermissionById,
	ICreatePermission,
	IUpdatePermission,
	IRemovePermission,
} from './types'

export class PermissionService {
	private readonly _http: IHttpService

	constructor({ http }: IDependencies) {
		this._http = http
	}

	public async find(params: IFindPermissions['request']) {
		const response = await this._http.client.get<IFindPermissions['response']>('/permissions', {
			params,
		})
		const permissions = response.data.data.map(this._parse)
		return {
			data: permissions,
			limit: response.data.limit,
			offset: response.data.offset,
			total: response.data.total,
		}
	}

	public async findAll() {
		const url = '/permissions/all'
		const response = await this._http.client.get<IFindAllPermissions['response']>(url)
		const permissions = response.data.data.map(this._parse)
		return {
			data: permissions,
			total: response.data.total,
		}
	}

	public async findById(params: IFindPermissionById['request']) {
		const url = `/permissions/${params.id}`
		const response = await this._http.client.get<IFindPermissionById['response']>(url)
		const permission = this._parse(response.data.data)
		return { data: permission }
	}

	public async create(params: ICreatePermission['request']) {
		const response = await this._http.client.post<ICreatePermission['response']>(
			'/permissions',
			params
		)
		const permission = this._parse(response.data.data)
		return {
			data: permission,
			message: response.data.message,
		}
	}

	public async update(params: IUpdatePermission['request']) {
		const url = `/permissions/${params.id}`
		const response = await this._http.client.patch<IUpdatePermission['response']>(url, params)
		const permission = this._parse(response.data.data)
		return {
			data: permission,
			message: response.data.message,
		}
	}

	public async remove(params: IRemovePermission['request']) {
		const url = `/permissions/${params.id}`
		const response = await this._http.client.delete<IRemovePermission['response']>(url)
		const permission = this._parse(response.data.data)
		return {
			data: permission,
			message: response.data.message,
		}
	}

	private _parse(permission: IJsonPermission): IPermission {
		return {
			id: permission.id,
			key: permission.key,
			name: permission.name,
			createdAt: new Date(permission.createdAt),
			updatedAt: new Date(permission.updatedAt),
		}
	}
}

interface IDependencies {
	http: IHttpService
}
