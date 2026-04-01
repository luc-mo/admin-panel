import { useState, useRef, useEffect } from 'react'
import { useLoadings } from '@/shared/hooks/use-loadings'
import type { ISession } from '@/domain/session'
import type { ICredentials } from '@/domain/credentials'
import type { IServicesContext } from '@/ui/providers/services-provider'
import type { IRouterContext } from '@/ui/providers/router-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseAuthProps {
	services: IServicesContext
	router: IRouterContext
	toast: IToastContext
}

export const useAuth = ({ services, router, toast }: IUseAuthProps) => {
	const isFirstSessionLoad = useRef(true)
	const [session, setSession] = useState<ISession>({ accessToken: null })
	const { loadings, setLoading } = useLoadings(_initialLoadings)

	const _applySession = (accessToken: string) => {
		setSession({ accessToken })
		services.localStorage.setItem('accessToken', accessToken)
	}

	const _removeSession = () => {
		setSession({ accessToken: null })
		services.localStorage.removeItem('accessToken')
	}

	const logIn = async (credentials: ICredentials) => {
		try {
			setLoading({ logIn: true })
			const accessToken = await services.auth.logIn(credentials)
			_applySession(accessToken)
			toast.show('success', 'Sesión iniciada exitosamente')
			router.navigate('/dashboard')
		} catch {
			toast.show('error', 'Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente')
		}
		setLoading({ logIn: false })
	}

	const logOut = async () => {
		try {
			setLoading({ logOut: true })
			await services.auth.logOut()
			_removeSession()
			toast.show('success', 'Sesión cerrada exitosamente')
			router.navigate('/auth/login')
		} catch {
			toast.show('error', 'Ocurrió un error al cerrar sesión. Por favor, intenta nuevamente.')
		}
		setLoading({ logOut: false })
	}

	useEffect(() => {
		const unsubscribe = services.auth.onSessionChange((accessToken) => {
			if (accessToken) {
				_applySession(accessToken)
				if (isFirstSessionLoad.current) {
					isFirstSessionLoad.current = false
					toast.show('success', 'Sesión reanudada exitosamente')
				}
			} else {
				const alreadyHadSession = services.localStorage.getItem('accessToken')
				_removeSession()
				if (isFirstSessionLoad.current) {
					isFirstSessionLoad.current = false
					if (alreadyHadSession) {
						toast.show('info', 'La sesión ha expirado, por favor inicia sesión nuevamente')
					}
				}
			}
			setLoading({ session: false })
		})
		return unsubscribe
	}, [])

	return { session, loadings, logIn, logOut }
}

const _initialLoadings = {
	session: true,
	logIn: false,
	logOut: false,
}
