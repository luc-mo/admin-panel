import type { IJsonUser } from '@princesitas/core'

export interface IFindUsers {
	request: {
		limit: number
		offset: number
	}
	response: {
		data: IJsonUser[]
		limit: number
		offset: number
		total: number
	}
}

export interface IFindUserById {
	request: {
		id: string
	}
	response: {
		data: IJsonUser
	}
}

export interface ICreateUser {
	request: {
		email: string
		username: string
		password: string
		roles: string[]
	}
	response: {
		data: IJsonUser
		message: string
	}
}

export interface IUpdateUser {
	request: {
		id: string
		username?: string
		roles?: string[]
	}
	response: {
		data: IJsonUser
		message: string
	}
}

export interface IRemoveUser {
	request: {
		id: string
	}
	response: {
		data: IJsonUser
		message: string
	}
}
