import type { RouteObject } from 'react-router-dom'

export const authRouter: RouteObject[] = [
	{
		path: '/auth/login',
		lazy: async () => {
			const module = await import('./pages/login')
			return { Component: module.Login }
		},
	},
]
