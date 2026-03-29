import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: '/',
		lazy: async () => {
			const module = await import('@/App')
			return { Component: module.App }
		},
		hydrateFallbackElement: <></>,
		children: [
			{
				path: '/auth/login',
				lazy: async () => {
					const module = await import('@/pages/login')
					return { Component: module.Login }
				},
			},
			{
				path: '/dashboard',
				lazy: async () => {
					const module = await import('@/pages/dashboard')
					return { Component: module.Dashboard }
				},
			},
		],
	},
])
