import type { IJsonRole } from '@princesitas/core'

export class RemoveRoleResponse {
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
