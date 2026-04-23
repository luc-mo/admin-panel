import type { IJsonUser } from '@admin-panel/core'

export class FindUserByIdResponse {
	public readonly data: IJsonUser

	constructor(params: IConstructor) {
		this.data = params.data
	}
}

interface IConstructor {
	data: IJsonUser
}
