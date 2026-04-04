import type { IJsonRole } from '@princesitas/core'

export class FindAllRolesResponse {
	public readonly data: IJsonRole[]
	public readonly total: number

	constructor({ data, total }: IConstructor) {
		this.data = data
		this.total = total
	}
}

interface IConstructor {
	data: IJsonRole[]
	total: number
}
