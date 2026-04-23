import type { IJsonPermission } from '@admin-panel/core'

export class RemovePermissionResponse {
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
