import type { IJsonUser } from '@princesitas/core'

export class FindUsersResponse {
	public readonly data: IJsonUser[]
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
	data: IJsonUser[]
	limit: number
	offset: number
	total: number
}
