import type { IJsonPermission } from '@princesitas/core'

export class FindPermissionByIdResponse {
	public readonly data: IJsonPermission

	constructor(params: IConstructor) {
		this.data = params.data
	}
}

interface IConstructor {
	data: IJsonPermission
}
