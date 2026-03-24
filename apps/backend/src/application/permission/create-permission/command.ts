export class CreatePermissionCommand {
	public readonly key: string
	public readonly name: string

	constructor(params: IConstructor) {
		this.key = params.key
		this.name = params.name
	}
}

interface IConstructor {
	key: string
	name: string
}
