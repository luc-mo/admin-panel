import type { IRole, IJsonRole, IRoleCategory } from './types'

export class Role {
	private readonly _id: string
	private readonly _name: string
	private readonly _description: string
	private readonly _permissions: string[]
	private readonly _category: IRoleCategory
	private readonly _createdAt: Date
	private readonly _updatedAt: Date

	constructor(data: IRole) {
		this._id = data.id
		this._name = data.name
		this._description = data.description
		this._permissions = data.permissions
		this._category = data.category
		this._createdAt = data.createdAt
		this._updatedAt = data.updatedAt
	}

	public toJSON(): IJsonRole {
		return {
			id: this._id,
			name: this._name,
			description: this._description,
			permissions: this._permissions,
			category: this._category,
			createdAt: this._createdAt.toISOString(),
			updatedAt: this._updatedAt.toISOString(),
		}
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

	public get category() {
		return this._category
	}

	public get createdAt() {
		return this._createdAt
	}

	public get updatedAt() {
		return this._updatedAt
	}
}
