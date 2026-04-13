import type { IRoleCategory } from '@princesitas/core'

export const roleTagColors: Record<IRoleCategory, string> = {
	ADMIN: 'blue',
	EDITOR: 'green',
	READER: 'geekblue',
	OTHER: 'default',
}

export const roleCategoryLabels: Record<IRoleCategory, string> = {
	ADMIN: 'Administrador',
	EDITOR: 'Editor',
	READER: 'Lector',
	OTHER: 'Otro',
}

export const permissionTagColors: Record<string, string> = {
	create: 'green',
	list: 'blue',
	view: 'purple',
	update: 'orange',
	delete: 'red',
}
