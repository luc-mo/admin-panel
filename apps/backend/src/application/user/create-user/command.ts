export class CreateUserCommand {
	public readonly email: string
	public readonly username: string
	public readonly password: string
	public readonly roles: string[]

	constructor(params: IConstructor) {
		this.email = params.email
		this.username = params.username
		this.password = params.password
		this.roles = params.roles
	}
}

interface IConstructor {
	email: string
	username: string
	password: string
	roles: string[]
}
