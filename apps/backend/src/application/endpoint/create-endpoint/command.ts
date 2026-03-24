export class CreateEndpointCommand {
	public readonly path: string
	public readonly roles: string[]

	constructor(params: IConstructor) {
		this.path = params.path
		this.roles = params.roles
	}
}

interface IConstructor {
	path: string
	roles: string[]
}
