import type { IJsonEndpoint } from '@princesitas/core'

export class FindEndpointByIdResponse {
	public readonly data: IJsonEndpoint

	constructor(params: IConstructor) {
		this.data = params.data
	}
}

interface IConstructor {
	data: IJsonEndpoint
}
