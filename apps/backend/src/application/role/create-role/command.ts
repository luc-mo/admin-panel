export class CreateRoleCommand {
	public readonly name: string
	public readonly description: string
	public readonly permissions: string[]
	public readonly category: string

	constructor(params: IConstructor) {
		this.name = params.name
		this.description = params.description
		this.permissions = params.permissions
		this.category = params.category
	}
}

interface IConstructor {
	name: string
	description: string
	permissions: string[]
	category: string
}
