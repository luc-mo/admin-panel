export interface IEndpoint {
	id: string
	path: string
	permissions: string[][]
	createdAt: Date
	updatedAt: Date
}

export interface IJsonEndpoint {
	id: string
	path: string
	permissions: string[][]
	createdAt: string
	updatedAt: string
}
