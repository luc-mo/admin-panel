import type { IJsonRole } from '@admin-panel/core'

export class FindRoleByIdResponse {
	public readonly data: IJsonRole

	constructor(params: IConstructor) {
		this.data = params.data
	}
}

interface IConstructor {
	data: IJsonRole
}
