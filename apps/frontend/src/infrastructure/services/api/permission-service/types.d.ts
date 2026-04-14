import type { IJsonPermission } from '@princesitas/core'

export interface IFindPermissions {
	request: {
		limit: number
		offset: number
	}
	response: {
		data: IJsonPermission[]
		limit: number
		offset: number
		total: number
	}
}

export interface IFindAllPermissions {
	response: {
		data: IJsonPermission[]
		total: number
	}
}

export interface IFindPermissionById {
	request: {
		id: string
	}
	response: {
		data: IJsonPermission
	}
}

export interface ICreatePermission {
	request: {
		key: string
		name: string
	}
	response: {
		data: IJsonPermission
		message: string
	}
}

export interface IUpdatePermission {
	request: {
		id: string
		key?: string
		name?: string
	}
	response: {
		data: IJsonPermission
		message: string
	}
}

export interface IRemovePermission {
	request: {
		id: string
	}
	response: {
		data: IJsonPermission
		message: string
	}
}
