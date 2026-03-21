import type { IRole } from './types'

export class Role {
	private readonly _id: string
	private readonly _name: string
	private readonly _description: string
	private readonly _permissions: string[]
	private readonly _createdAt: Date
	private readonly _updatedAt: Date

	constructor(data: IRole) {
		this._id = data.id
		this._name = data.name
		this._description = data.description
		this._permissions = data.permissions
		this._createdAt = data.createdAt
		this._updatedAt = data.updatedAt
	}

	public get id() {
		return this._id
	}

	public get name() {
		return this._name
	}

	public get description() {
		return this._description
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
