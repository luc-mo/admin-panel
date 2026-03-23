import type { IJsonUser } from '@princesitas/core'

export class FindUserByIdResponse {
	public readonly data: IJsonUser

	constructor(params: IConstructor) {
		this.data = params.data
	}
}

interface IConstructor {
	data: IJsonUser
}
