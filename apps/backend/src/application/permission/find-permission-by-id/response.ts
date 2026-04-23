import type { IJsonPermission } from '@admin-panel/core'

export class FindPermissionByIdResponse {
	public readonly data: IJsonPermission

	constructor(params: IConstructor) {
		this.data = params.data
	}
}

interface IConstructor {
	data: IJsonPermission
}
