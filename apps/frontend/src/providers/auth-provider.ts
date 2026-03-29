import { useState } from 'react'
import { message } from 'antd'
import { createProvider } from './utils/create-provider'
import { useProviders } from './utils/use-providers'
import { servicesProvider } from './services-provider'
import { routerProvider } from './router-provider'

export const authProvider = createProvider({
	providerName: 'AuthProvider',
	contextName: 'auth',
	useValue: () => {
		const { services, router } = useProviders([servicesProvider, routerProvider])
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
				router.navigate('/auth/login')
			} catch {
				message.error('Ocurrió un error al cerrar sesión. Por favor, intenta nuevamente.')
			}
			setLoadings((prev) => ({ ...prev, logOut: false }))
		}

		return {
			logInLoading: loadings.logIn,
			logOutLoading: loadings.logOut,
			logIn,
			logOut,
		}
	},
})
