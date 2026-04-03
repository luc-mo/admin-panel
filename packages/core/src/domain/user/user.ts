import type { IUser, IJsonUser } from './types'

export class User {
	private readonly _id: string
	private readonly _email: string
	private readonly _username: string
	private readonly _roles: string[]
	private readonly _isSuperAdmin?: boolean
	private readonly _createdAt: Date
	private readonly _updatedAt: Date

	constructor(data: IUser) {
		this._id = data.id
		this._email = data.email
		this._username = data.username
		this._roles = data.roles
		this._isSuperAdmin = data.isSuperAdmin
		this._createdAt = data.createdAt
		this._updatedAt = data.updatedAt
	}

	public toJSON(): IJsonUser {
		return {
			id: this._id,
			email: this._email,
			username: this._username,
			roles: this._roles,
			isSuperAdmin: this._isSuperAdmin,
			createdAt: this._createdAt.toISOString(),
			updatedAt: this._updatedAt.toISOString(),
		}
	}

	public get id() {
		return this._id
	}

	public get email() {
		return this._email
	}

	public get username() {
		return this._username
	}

	public get roles() {
		return this._roles
	}

	public get isSuperAdmin() {
		return this._isSuperAdmin
	}

	public get createdAt() {
		return this._createdAt
	}

	public get updatedAt() {
		return this._updatedAt
	}
}
