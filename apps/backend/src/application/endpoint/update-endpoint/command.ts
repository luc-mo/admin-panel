export class UpdateEndpointCommand {
	public readonly id: string
	public readonly path?: string
	public readonly roles?: string[]

	constructor(params: IConstructor) {
		this.id = params.id
		this.path = params.path
		this.roles = params.roles
	}
}

interface IConstructor {
	id: string
	path?: string
	roles?: string[]
}
