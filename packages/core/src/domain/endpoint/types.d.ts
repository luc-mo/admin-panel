export interface IEndpoint {
	id: string
	path: string
	roles: string[]
	createdAt: Date
	updatedAt: Date
}

export interface IJsonEndpoint {
	id: string
	path: string
	roles: string[]
	createdAt: string
	updatedAt: string
}
