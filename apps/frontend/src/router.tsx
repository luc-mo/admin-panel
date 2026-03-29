import { createBrowserRouter } from 'react-router-dom'
import { authRouter } from '@/auth/router'

export const router = createBrowserRouter([
	{
		path: '/',
		lazy: async () => {
			const module = await import('@/App')
			return { Component: module.App }
		},
		hydrateFallbackElement: <></>,
		children: [...authRouter],
	},
])
