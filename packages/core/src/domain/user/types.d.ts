export interface IUser {
	id: string
	email: string
	username: string
	roles: string[]
	isSuperAdmin?: boolean
	createdAt: Date
	updatedAt: Date
}

export interface IJsonUser {
	id: string
	email: string
	username: string
	roles: string[]
	isSuperAdmin?: boolean
	createdAt: string
	updatedAt: string
}
