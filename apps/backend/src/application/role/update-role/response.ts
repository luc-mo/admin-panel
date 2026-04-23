import type { IJsonRole } from '@admin-panel/core'

export class UpdateRoleResponse {
	public readonly data: IJsonRole
	public readonly message: string

	constructor(params: IConstructor) {
		this.data = params.data
		this.message = params.message
	}
}

interface IConstructor {
	data: IJsonRole
	message: string
}
