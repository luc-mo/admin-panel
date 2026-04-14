import type { IJsonEndpoint } from '@princesitas/core'

export interface IFindEndpoints {
	request: {
		limit: number
		offset: number
	}
	response: {
		data: IJsonEndpoint[]
		limit: number
		offset: number
		total: number
	}
}

export interface IFindEndpointById {
	request: {
		id: string
	}
	response: {
		data: IJsonEndpoint
	}
}

export interface ICreateEndpoint {
	request: {
		path: string
		roles: string[]
	}
	response: {
		data: IJsonEndpoint
		message: string
	}
}

export interface IUpdateEndpoint {
	request: {
		id: string
		path?: string
		roles?: string[]
	}
	response: {
		data: IJsonEndpoint
		message: string
	}
}

export interface IRemoveEndpoint {
	request: {
		id: string
	}
	response: {
		data: IJsonEndpoint
		message: string
	}
}
