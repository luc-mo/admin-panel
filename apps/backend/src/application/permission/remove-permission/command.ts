export class RemovePermissionCommand {
	public readonly id: string

	constructor(params: IConstructor) {
		this.id = params.id
	}
}

interface IConstructor {
	id: string
}
