import { useState, useEffect } from 'react'
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
		const [session, setSession] = useState<ISession>({
			accessToken: null,
			refreshToken: null,
			expiresIn: null,
		})
		const [loadings, setLoadings] = useState({
			session: true,
			logIn: false,
			logOut: false,
		})

		const logIn = async (credentials: ICredentials) => {
			try {
				setLoadings((prev) => ({ ...prev, logIn: true }))
				const result = await services.auth.logIn(credentials)

				services.localStorage.setItem('auth.access_token', result.accessToken)
				services.localStorage.setItem('auth.refresh_token', result.refreshToken)
				services.localStorage.setItem('auth.expires_in', result.expiresIn, String)
				setSession(result)
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
				setSession({
					accessToken: null,
					refreshToken: null,
					expiresIn: null,
				})
				router.navigate('/auth/login')
			} catch {
				message.error('Ocurrió un error al cerrar sesión. Por favor, intenta nuevamente.')
			}
			setLoadings((prev) => ({ ...prev, logOut: false }))
		}

		// biome-ignore lint/correctness/useExhaustiveDependencies: Just run one time
		useEffect(() => {
			const unsubscribe = services.auth.onSessionChange(async (user) => {
				if (user) {
					const accessToken = await user.getIdToken()
					const refreshToken = user.refreshToken
					const expiresIn = 3600
					services.localStorage.setItem('auth.access_token', accessToken)
					services.localStorage.setItem('auth.refresh_token', refreshToken)
					services.localStorage.setItem('auth.expires_in', expiresIn, String)
					setSession({ accessToken, refreshToken, expiresIn })
				} else {
					services.localStorage.removeItem('auth.access_token')
					services.localStorage.removeItem('auth.refresh_token')
					services.localStorage.removeItem('auth.expires_in')
					setSession({
						accessToken: null,
						refreshToken: null,
						expiresIn: null,
					})
				}

				setLoadings((prev) => ({ ...prev, session: false }))
			})
			return unsubscribe
		}, [])

		return {
			session,
			loadings,
			logIn,
			logOut,
		}
	},
})

interface ICredentials {
	email: string
	password: string
}

interface ISession {
	accessToken: string | null
	refreshToken: string | null
	expiresIn: number | null
}
