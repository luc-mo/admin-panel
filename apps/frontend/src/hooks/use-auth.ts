import { useState } from 'react'
import { message } from 'antd'
import { useProviders } from '@/providers/utils/use-providers'
import { routerProvider } from '@/providers/router-provider'
import { servicesProvider } from '@/providers/services-provider'

export const useAuth = () => {
	const { router, services } = useProviders([routerProvider, servicesProvider])
	const [loadings, setLoadings] = useState({
		logIn: false,
		logOut: false,
	})

	const logIn = async (credentials: { email: string; password: string }) => {
		try {
			setLoadings((prev) => ({ ...prev, logIn: true }))
			const result = await services.auth.logIn(credentials)
			services.localStorage.setItem('auth.access_token', result.accessToken)
			services.localStorage.setItem('auth.refresh_token', result.refreshToken)
			services.localStorage.setItem('auth.expires_in', result.expiresIn, String)
			router.navigate('/dashboard')
		} catch {
			message.error('Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.')
		}
		setLoadings((prev) => ({ ...prev, logIn: false }))
	}

	const logOut = async () => {
		try {
			setLoadings((prev) => ({ ...prev, logOut: true }))
			await services.auth.logOut()
			services.localStorage.removeItem('auth.access_token')
			services.localStorage.removeItem('auth.refresh_token')
			services.localStorage.removeItem('auth.expires_in')
		} catch {
			message.error('Ocurrió un error al cerrar sesión. Por favor, intenta nuevamente.')
		}
		setLoadings((prev) => ({ ...prev, logOut: false }))
	}

	return {
		loadings,
		logIn,
		logOut,
	}
}
