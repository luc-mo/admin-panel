import { useProviders } from '@/ui/providers/utils/use-providers'
import { routerProvider } from '@/ui/providers/router-provider'
import { authProvider } from '@/ui/providers/auth-provider'

export const useDashboard = () => {
	const { auth, router } = useProviders([authProvider, routerProvider])

	const onMenuClick = (info: IMenuInfo) => {
		const isLogOut = info.key === 'logout'
		if (isLogOut) auth.logOut()
		else router.navigate(info.key)
	}

	return { onMenuClick }
}

interface IMenuInfo {
	key: string
	keyPath: string[]
	domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
}
