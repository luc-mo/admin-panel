import type { IPermission, IJsonPermission } from './types'

export class Permission {
	private readonly _id: string
	private readonly _key: string
	private readonly _name: string
	private readonly _createdAt: Date
	private readonly _updatedAt: Date

	constructor(data: IPermission) {
		this._id = data.id
		this._key = data.key
		this._name = data.name
		this._createdAt = data.createdAt
		this._updatedAt = data.updatedAt
	}

	public toJSON(): IJsonPermission {
		return {
			id: this._id,
			key: this._key,
			name: this._name,
			createdAt: this._createdAt.toISOString(),
			updatedAt: this._updatedAt.toISOString(),
		}
	}

	public get id() {
		return this._id
	}

	public get key() {
		return this._key
	}

	public get name() {
		return this._name
	}

	public get createdAt() {
		return this._createdAt
	}

	public get updatedAt() {
		return this._updatedAt
	}
}
