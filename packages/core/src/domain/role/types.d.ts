export interface IRole {
	id: string
	name: string
	description: string
	permissions: string[]
	createdAt: Date
	updatedAt: Date
}

export interface IJsonRole {
	id: string
	name: string
	description: string
	permissions: string[]
	createdAt: string
	updatedAt: string
}
