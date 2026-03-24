export class FindEndpointByIdCommand {
	public readonly id: string

	constructor({ id }: IConstructor) {
		this.id = id
	}
}

interface IConstructor {
	id: string
}
