import type { IJsonPermission } from '@princesitas/core'

export class FindPermissionsResponse {
	public readonly data: IJsonPermission[]
	public readonly limit: number
	public readonly offset: number
	public readonly total: number

	constructor({ data, limit, offset, total }: IConstructor) {
		this.data = data
		this.limit = limit
		this.offset = offset
		this.total = total
	}
}

interface IConstructor {
	data: IJsonPermission[]
	limit: number
	offset: number
	total: number
}
