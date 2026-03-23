import type { IEndpoint } from './types'

export class Endpoint {
	private readonly _id: string
	private readonly _path: string
	private readonly _permissions: string[][]
	private readonly _createdAt: Date
	private readonly _updatedAt: Date

	constructor(data: IEndpoint) {
		this._id = data.id
		this._path = data.path
		this._permissions = data.permissions
		this._createdAt = data.createdAt
		this._updatedAt = data.updatedAt
	}

	public get id() {
		return this._id
	}

	public get path() {
		return this._path
	}

	public get permissions() {
		return this._permissions
	}

	public get createdAt() {
		return this._createdAt
	}

	public get updatedAt() {
		return this._updatedAt
	}
}
