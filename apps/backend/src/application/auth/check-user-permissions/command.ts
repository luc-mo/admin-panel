export class CheckUserPermissionsCommand {
	public readonly userId: string
	public readonly path: string

	constructor(params: IConstructor) {
		this.userId = params.userId
		this.path = params.path
	}
}

interface IConstructor {
	userId: string
	path: string
}
