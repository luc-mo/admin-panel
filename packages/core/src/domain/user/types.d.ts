export interface IUser {
	id: string
	email: string
	username: string
	displayName: string
	roles: string[]
	createdAt: Date
	updatedAt: Date
}

export interface IJsonUser {
	id: string
	email: string
	username: string
	displayName: string
	roles: string[]
	createdAt: string
	updatedAt: string
}
