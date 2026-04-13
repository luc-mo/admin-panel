import type { IRole, IJsonRole } from '@princesitas/core'
import type { IHttpService } from '@/infrastructure/services/http-service'
import type {
	IFindRoles,
	IFindAllRoles,
	IFindRoleById,
	ICreateRole,
	IUpdateRole,
	IRemoveRole,
} from './types'

export class RoleService {
	private readonly _http: IHttpService

	constructor({ http }: IDependencies) {
		this._http = http
	}

	public async find(params: IFindRoles['request']) {
		const response = await this._http.client.get<IFindRoles['response']>('/roles', { params })
		const roles = response.data.data.map(this._parseRole)
		return {
			data: roles,
			limit: response.data.limit,
			offset: response.data.offset,
			total: response.data.total,
		}
	}

	public async findAll() {
		const response = await this._http.client.get<IFindAllRoles['response']>('/roles/all')
		const roles = response.data.data.map(this._parseRole)
		return {
			data: roles,
			total: response.data.total,
		}
	}

	public async findRoleById(params: IFindRoleById['request']) {
		const url = `/roles/${params.id}`
		const response = await this._http.client.get<IFindRoleById['response']>(url)
		const role = this._parseRole(response.data.data)
		return { data: role }
	}

	public async create(params: ICreateRole['request']) {
		const response = await this._http.client.post<ICreateRole['response']>('/roles', params)
		const role = this._parseRole(response.data.data)
		return {
			data: role,
			message: response.data.message,
		}
	}

	public async update(params: IUpdateRole['request']) {
		const url = `/roles/${params.id}`
		const response = await this._http.client.patch<IUpdateRole['response']>(url, params)
		const role = this._parseRole(response.data.data)
		return {
			data: role,
			message: response.data.message,
		}
	}

	public async remove(params: IRemoveRole['request']) {
		const url = `/roles/${params.id}`
		const response = await this._http.client.delete<IRemoveRole['response']>(url)
		const role = this._parseRole(response.data.data)
		return {
			data: role,
			message: response.data.message,
		}
	}

	private _parseRole(role: IJsonRole): IRole {
		return {
			id: role.id,
			name: role.name,
			description: role.description,
			permissions: role.permissions,
			category: role.category,
			createdAt: new Date(role.createdAt),
			updatedAt: new Date(role.updatedAt),
		}
	}
}

interface IDependencies {
	http: IHttpService
}
