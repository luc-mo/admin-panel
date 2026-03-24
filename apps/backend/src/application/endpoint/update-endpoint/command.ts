export class UpdateEndpointCommand {
	public readonly id: string
	public readonly path?: string
	public readonly permissions?: string[][]

	constructor(params: IConstructor) {
		this.id = params.id
		this.path = params.path
		this.permissions = params.permissions
	}
}

interface IConstructor {
	id: string
	path?: string
	permissions?: string[][]
}
