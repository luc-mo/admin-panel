import type { IUser, IJsonUser } from '@princesitas/core'
import type { IHttpClient } from '@/infrastructure/services/http-service'
import type { IFindUsers, IFindUserById, ICreateUser, IUpdateUser, IRemoveUser } from './types'

export class UserService {
	private readonly _http: IHttpClient

	constructor({ http }: IDependencies) {
		this._http = http
	}

	public async findUsers(params: IFindUsers['request']) {
		const response = await this._http.client.get<IFindUsers['response']>('/users', { params })
		const users = response.data.data.map(this._parseUser)
		return {
			data: users,
			limit: response.data.limit,
			offset: response.data.offset,
			total: response.data.total,
		}
	}

	public async findMe() {
		const response = await this._http.client.get<IFindUserById['response']>('/users/me')
		const user = this._parseUser(response.data.data)
		return { data: user }
	}

	public async findUserById(params: IFindUserById['request']) {
		const url = `/users/${params.id}`
		const response = await this._http.client.get<IFindUserById['response']>(url)
		const user = this._parseUser(response.data.data)
		return { data: user }
	}

	public async createUser(params: ICreateUser['request']) {
		const response = await this._http.client.post<ICreateUser['response']>('/users', params)
		const user = this._parseUser(response.data.data)
		return {
			data: user,
			message: response.data.message,
		}
	}

	public async updateUser(params: IUpdateUser['request']) {
		const url = `/users/${params.id}`
		const response = await this._http.client.patch<IUpdateUser['response']>(url, params)
		const user = this._parseUser(response.data.data)
		return {
			data: user,
			message: response.data.message,
		}
	}

	public async removeUser(params: IRemoveUser['request']) {
		const url = `/users/${params.id}`
		const response = await this._http.client.delete<IRemoveUser['response']>(url)
		const user = this._parseUser(response.data.data)
		return {
			data: user,
			message: response.data.message,
		}
	}

	private _parseUser(user: IJsonUser): IUser {
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			roles: user.roles,
			isSuperAdmin: user.isSuperAdmin,
			createdAt: new Date(user.createdAt),
			updatedAt: new Date(user.updatedAt),
		}
	}
}

interface IDependencies {
	http: IHttpClient
}
