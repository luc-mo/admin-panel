export class CreateEndpointCommand {
	public readonly path: string
	public readonly permissions: string[][]

	constructor(params: IConstructor) {
		this.path = params.path
		this.permissions = params.permissions
	}
}

interface IConstructor {
	path: string
	permissions: string[][]
}
