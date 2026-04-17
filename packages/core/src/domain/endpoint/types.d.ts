export interface IEndpoint {
	id: string
	method: IEndpointMethod
	path: string
	roles: string[]
	createdAt: Date
	updatedAt: Date
}

export interface IJsonEndpoint {
	id: string
	method: IEndpointMethod
	path: string
	roles: string[]
	createdAt: string
	updatedAt: string
}

export type IEndpointMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
