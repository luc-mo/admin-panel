import type { IJsonEndpoint } from '@princesitas/core'

export class FindEndpointsResponse {
	public readonly data: IJsonEndpoint[]
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
	data: IJsonEndpoint[]
	limit: number
	offset: number
	total: number
}
