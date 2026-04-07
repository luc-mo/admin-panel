export interface IRole {
	id: string
	name: string
	description: string
	permissions: string[]
	category: IRoleCategory
	createdAt: Date
	updatedAt: Date
}

export interface IJsonRole {
	id: string
	name: string
	description: string
	permissions: string[]
	category: IRoleCategory
	createdAt: string
	updatedAt: string
}

export type IRoleCategory = 'ADMIN' | 'EDITOR' | 'READER' | 'OTHER'
