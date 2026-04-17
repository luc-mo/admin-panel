import type { IEndpoint, IJsonEndpoint, IEndpointMethod } from './types'

export class Endpoint {
	private readonly _id: string
	private readonly _method: IEndpointMethod
	private readonly _path: string
	private readonly _roles: string[]
	private readonly _createdAt: Date
	private readonly _updatedAt: Date

	constructor(data: IEndpoint) {
		this._id = data.id
		this._method = data.method
		this._path = data.path
		this._roles = data.roles
		this._createdAt = data.createdAt
		this._updatedAt = data.updatedAt
	}

	public toJSON(): IJsonEndpoint {
		return {
			id: this._id,
			method: this._method,
			path: this._path,
			roles: this._roles,
			createdAt: this._createdAt.toISOString(),
			updatedAt: this._updatedAt.toISOString(),
		}
	}

	public get id() {
		return this._id
	}

	public get method() {
		return this._method
	}

	public get path() {
		return this._path
	}

	public get roles() {
		return this._roles
	}

	public get createdAt() {
		return this._createdAt
	}

	public get updatedAt() {
		return this._updatedAt
	}
}
