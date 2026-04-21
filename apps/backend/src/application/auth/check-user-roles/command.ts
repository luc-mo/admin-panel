export class CheckUserRolesCommand {
	public readonly userId: string
	public readonly method: string
	public readonly path: string

	constructor(params: IConstructor) {
		this.userId = params.userId
		this.method = params.method
		this.path = params.path
	}
}

interface IConstructor {
	userId: string
	method: string
	path: string
}
