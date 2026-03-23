export class UpdateUserCommand {
	public readonly id: string
	public readonly displayName?: string
	public readonly roles?: string[]

	constructor(params: IConstructor) {
		this.id = params.id
		this.displayName = params.displayName
		this.roles = params.roles
	}
}

interface IConstructor {
	id: string
	displayName?: string
	roles?: string[]
}
