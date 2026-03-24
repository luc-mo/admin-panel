export class UpdateUserCommand {
	public readonly id: string
	public readonly username?: string
	public readonly roles?: string[]

	constructor(params: IConstructor) {
		this.id = params.id
		this.username = params.username
		this.roles = params.roles
	}
}

interface IConstructor {
	id: string
	username?: string
	roles?: string[]
}
