import type { IEndpointMethod } from '@princesitas/core'

export const methodOptions: { label: string; value: IEndpointMethod }[] = [
	{ label: 'GET', value: 'GET' },
	{ label: 'POST', value: 'POST' },
	{ label: 'PUT', value: 'PUT' },
	{ label: 'PATCH', value: 'PATCH' },
	{ label: 'DELETE', value: 'DELETE' },
]
