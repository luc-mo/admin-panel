import type { ICachedEndpoint } from './types'

export class CachedEndpoint {
	private readonly _id: string
	private readonly _method: string
	private readonly _path: string
	private readonly _roles: string[]
	private readonly _cachedAt: Date

	constructor(data: ICachedEndpoint) {
		this._id = data.id
		this._method = data.method
		this._path = data.path
		this._roles = data.roles
		this._cachedAt = data.cachedAt
	}

	get id() {
		return this._id
	}

	get method() {
		return this._method
	}

	get path() {
		return this._path
	}

	get roles() {
		return this._roles
	}

	get cachedAt() {
		return this._cachedAt
	}
}
