import {
	usersPagePermissions,
	rolesPagePermissions,
	permissionsPagePermissions,
	endpointsPagePermissions,
} from '@/ui/constants/page-permissions'
import { useHasAccess } from '@/application/auth/use-has-access'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { routerProvider } from '@/ui/providers/router-provider'
import { authProvider } from '@/ui/providers/auth-provider'

export const useDashboard = () => {
	const { auth, router } = useProviders([authProvider, routerProvider])
	const menuAccess: Record<string, boolean> = {
		'/dashboard/users': useHasAccess(usersPagePermissions),
		'/dashboard/roles': useHasAccess(rolesPagePermissions),
		'/dashboard/permissions': useHasAccess(permissionsPagePermissions),
		'/dashboard/endpoints': useHasAccess(endpointsPagePermissions),
	}

	const onMenuClick = (info: IMenuInfo) => {
		const isLogOut = info.key === 'logout'
		if (isLogOut) auth.logOut()
		else router.navigate(info.key)
	}

	return { menuAccess, onMenuClick }
}

interface IMenuInfo {
	key: string
	keyPath: string[]
	domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
}
