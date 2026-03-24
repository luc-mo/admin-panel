import type { IJsonPermission } from '@princesitas/core'

export class UpdatePermissionResponse {
	public readonly data: IJsonPermission
	public readonly message: string

	constructor(params: IConstructor) {
		this.data = params.data
		this.message = params.message
	}
}

interface IConstructor {
	data: IJsonPermission
	message: string
}
