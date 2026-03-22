export class CreateUserCommand {
	public readonly id: string
	public readonly email: string
	public readonly username: string
	public readonly password: string
	public readonly displayName: string

	constructor(params: IConstructor) {
		this.id = params.id
		this.email = params.email
		this.username = params.username
		this.password = params.password
		this.displayName = params.displayName
	}
}

interface IConstructor {
	id: string
	email: string
	username: string
	password: string
	displayName: string
}
