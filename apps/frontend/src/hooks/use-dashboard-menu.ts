import { useProviders } from '@/providers/utils/use-providers'
import { routerProvider } from '@/providers/router-provider'
import { authProvider } from '@/providers/auth-provider'

export const useDashboardMenu = () => {
	const { router, auth } = useProviders([routerProvider, authProvider])

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
