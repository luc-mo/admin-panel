export class UpdateRoleCommand {
	public readonly id: string
	public readonly name?: string
	public readonly description?: string
	public readonly permissions?: string[]

	constructor(params: IConstructor) {
		this.id = params.id
		this.name = params.name
		this.description = params.description
		this.permissions = params.permissions
	}
}

interface IConstructor {
	id: string
	name?: string
	description?: string
	permissions?: string[]
}
