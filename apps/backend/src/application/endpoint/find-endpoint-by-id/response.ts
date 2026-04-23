import type { IJsonEndpoint } from '@admin-panel/core'

export class FindEndpointByIdResponse {
	public readonly data: IJsonEndpoint

	constructor(params: IConstructor) {
		this.data = params.data
	}
}

interface IConstructor {
	data: IJsonEndpoint
}
