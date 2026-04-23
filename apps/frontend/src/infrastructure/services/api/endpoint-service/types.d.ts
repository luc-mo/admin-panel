import type { IJsonEndpoint, IEndpointMethod } from '@admin-panel/core'

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
		method: IEndpointMethod
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
		method?: IEndpointMethod
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
