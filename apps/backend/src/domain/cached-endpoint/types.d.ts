export interface ICachedEndpoint {
	id: string
	method: string
	path: string
	roles: string[]
	cachedAt: Date
}
