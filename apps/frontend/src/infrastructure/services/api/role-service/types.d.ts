import type { IJsonRole, IRoleCategory } from '@princesitas/core'

export interface IFindRoles {
	request: {
		limit: number
		offset: number
	}
	response: {
		data: IJsonRole[]
		limit: number
		offset: number
		total: number
	}
}

export interface IFindAllRoles {
	response: {
		data: IJsonRole[]
		total: number
	}
}

export interface IFindRoleById {
	request: {
		id: string
	}
	response: {
		data: IJsonRole
	}
}

export interface ICreateRole {
	request: {
		name: string
		description: string
		permissions: string[]
		category: IRoleCategory
	}
	response: {
		data: IJsonRole
		message: string
	}
}

export interface IUpdateRole {
	request: {
		id: string
		name?: string
		description?: string
		permissions?: string[]
		category?: IRoleCategory
	}
	response: {
		data: IJsonRole
		message: string
	}
}

export interface IRemoveRole {
	request: {
		id: string
	}
	response: {
		data: IJsonRole
		message: string
	}
}
