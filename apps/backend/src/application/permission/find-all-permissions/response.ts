import type { IJsonPermission } from '@princesitas/core'

export class FindAllPermissionsResponse {
	public readonly data: IJsonPermission[]
	public readonly total: number

	constructor({ data, total }: IConstructor) {
		this.data = data
		this.total = total
	}
}

interface IConstructor {
	data: IJsonPermission[]
	total: number
}
