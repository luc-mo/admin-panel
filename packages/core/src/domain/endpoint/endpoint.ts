import type { IEndpoint } from './types'

export class Endpoint {
	private readonly _id: string
	private readonly _path: string
	private readonly _permissions: string[][]

	constructor(data: IEndpoint) {
		this._id = data.id
		this._path = data.path
		this._permissions = data.permissions
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
}
