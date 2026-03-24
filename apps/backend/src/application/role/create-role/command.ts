export class CreateRoleCommand {
	public readonly name: string
	public readonly description: string
	public readonly permissions: string[]

	constructor(params: IConstructor) {
		this.name = params.name
		this.description = params.description
		this.permissions = params.permissions
	}
}

interface IConstructor {
	name: string
	description: string
	permissions: string[]
}
