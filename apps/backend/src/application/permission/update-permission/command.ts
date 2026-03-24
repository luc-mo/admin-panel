export class UpdatePermissionCommand {
	public readonly id: string
	public readonly key?: string
	public readonly name?: string

	constructor(params: IConstructor) {
		this.id = params.id
		this.key = params.key
		this.name = params.name
	}
}

interface IConstructor {
	id: string
	key?: string
	name?: string
}
