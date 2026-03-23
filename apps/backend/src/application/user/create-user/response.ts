import type { IJsonUser } from '@princesitas/core'

export class CreateUserResponse {
	public readonly data: IJsonUser
	public readonly message: string

	constructor(params: IConstructor) {
		this.data = params.data
		this.message = params.message
	}
}

interface IConstructor {
	data: IJsonUser
	message: string
}
