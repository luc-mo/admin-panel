import type { IEndpoint, IJsonEndpoint } from './types'

export class Endpoint {
	private readonly _id: string
	private readonly _path: string
	private readonly _roles: string[]
	private readonly _createdAt: Date
	private readonly _updatedAt: Date

	constructor(data: IEndpoint) {
		this._id = data.id
		this._path = data.path
		this._roles = data.roles
		this._createdAt = data.createdAt
		this._updatedAt = data.updatedAt
	}

	public toJSON(): IJsonEndpoint {
		return {
			id: this._id,
			path: this._path,
			roles: this._roles,
			createdAt: this._createdAt.toISOString(),
			updatedAt: this._updatedAt.toISOString(),
		}
	}

	public get id() {
		return this._id
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
