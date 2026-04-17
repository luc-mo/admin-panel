import type { IEndpointMethod } from '@princesitas/core'

export class CreateEndpointCommand {
	public readonly method: IEndpointMethod
	public readonly path: string
	public readonly roles: string[]

	constructor(params: IConstructor) {
		this.method = params.method
		this.path = params.path
		this.roles = params.roles
	}
}

interface IConstructor {
	method: IEndpointMethod
	path: string
	roles: string[]
}
