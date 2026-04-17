import type { IEndpointMethod } from '@princesitas/core'

export class UpdateEndpointCommand {
	public readonly id: string
	public readonly method?: IEndpointMethod
	public readonly path?: string
	public readonly roles?: string[]

	constructor(params: IConstructor) {
		this.id = params.id
		this.method = params.method
		this.path = params.path
		this.roles = params.roles
	}
}

interface IConstructor {
	id: string
	method?: IEndpointMethod
	path?: string
	roles?: string[]
}
