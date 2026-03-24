import type { IJsonEndpoint } from '@princesitas/core'

export class CreateEndpointResponse {
	public readonly data: IJsonEndpoint
	public readonly message: string

	constructor(params: IConstructor) {
		this.data = params.data
		this.message = params.message
	}
}

interface IConstructor {
	data: IJsonEndpoint
	message: string
}
