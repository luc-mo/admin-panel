export class FindPermissionsCommand {
	public readonly limit: number
	public readonly offset: number

	constructor(params: IConstructor) {
		this.limit = params.limit
		this.offset = params.offset
	}
}

interface IConstructor {
	limit: number
	offset: number
}
