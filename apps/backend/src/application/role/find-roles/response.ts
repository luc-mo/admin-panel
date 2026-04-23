import type { IJsonRole } from '@admin-panel/core'

export class FindRolesResponse {
	public readonly data: IJsonRole[]
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
	data: IJsonRole[]
	limit: number
	offset: number
	total: number
}
