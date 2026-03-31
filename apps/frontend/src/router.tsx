import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthGuard } from '@/layouts/auth-guard'

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
				index: true,
				element: <Navigate to="/dashboard" replace />,
			},
			{
				path: '/auth/*',
				element: <AuthGuard visibility="public" />,
				children: [
					{
						path: 'login',
						lazy: async () => {
							const module = await import('@/pages/login')
							return { Component: module.Login }
						},
					},
				],
			},
			{
				element: <AuthGuard visibility="private" />,
				children: [
					{
						path: '/dashboard',
						lazy: async () => {
							const module = await import('@/layouts/dashboard')
							return { Component: module.Dashboard }
						},
						children: [
							{
								index: true,
								lazy: async () => {
									const module = await import('@/pages/home')
									return { Component: module.Home }
								},
							},
							{
								path: 'users',
								lazy: async () => {
									const module = await import('@/pages/users')
									return { Component: module.Users }
								},
							},
							{
								path: 'roles',
								element: <div>Roles</div>,
							},
						],
					},
				],
			},
		],
	},
])
