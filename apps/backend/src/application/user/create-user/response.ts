export class CreateUserResponse {
	public readonly data: IConstructor['data']
	public readonly message: IConstructor['message']

	constructor(params: IConstructor) {
		this.data = params.data
		this.message = params.message
	}
}

interface IConstructor {
	data: {
		id: string
		email: string
		username: string
		displayName: string
		roles: string[]
		createdAt: Date
		updatedAt: Date
	}
	message: string
}
