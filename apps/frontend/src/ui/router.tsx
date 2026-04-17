import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthGuard } from '@/ui/guards/auth-guard'
import { Dashboard } from '@/ui/layouts/dashboard'

export const router = createBrowserRouter([
	{
		path: '/',
		hydrateFallbackElement: <></>,
		lazy: () => import('@/App').then((module) => ({ Component: module.App })),
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
						lazy: () => import('@/ui/pages/login').then((module) => ({ Component: module.Login })),
					},
				],
			},
			{
				element: <AuthGuard visibility="private" />,
				children: [
					{
						path: '/dashboard/*',
						element: <Dashboard />,
						children: [
							{
								index: true,
								lazy: () =>
									import('@/ui/pages/home').then((module) => ({ Component: module.Home })),
							},
							{
								path: 'users',
								lazy: () =>
									import('@/ui/pages/users').then((module) => ({ Component: module.Users })),
							},
							{
								path: 'roles',
								lazy: () =>
									import('@/ui/pages/roles').then((module) => ({ Component: module.Roles })),
							},
							{
								path: 'permissions',
								lazy: () =>
									import('@/ui/pages/permissions').then((module) => ({
										Component: module.Permissions,
									})),
							},
							{
								path: 'endpoints',
								lazy: () =>
									import('@/ui/pages/endpoints').then((module) => ({
										Component: module.Endpoints,
									})),
							},
						],
					},
				],
			},
		],
	},
])
