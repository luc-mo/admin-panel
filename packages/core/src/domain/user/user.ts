import type { IUser } from './types'

export class User {
	private readonly _id: string
	private readonly _email: string
	private readonly _username: string
	private readonly _displayName: string
	private readonly _roles: string[]
	private readonly _createdAt: Date
	private readonly _updatedAt: Date

	constructor(data: IUser) {
		this._id = data.id
		this._email = data.email
		this._username = data.username
		this._displayName = data.displayName
		this._roles = data.roles
		this._createdAt = data.createdAt
		this._updatedAt = data.updatedAt
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

	public get displayName() {
		return this._displayName
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
