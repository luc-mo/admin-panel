import { useEffect } from 'react'
import { createProvider } from './utils/create-provider'
import { useProviders } from './utils/use-providers'

import { coreServicesProvider } from './core-services-provider'
import { toastProvider } from './toast-provider'
import { useFindCurrentUser } from '@/application/user/use-find-current-user'
import { useFindAllRoles } from '@/application/role/use-find-all-roles'
import { useFindAllPermissions } from '@/application/permission/use-find-all-permissions'

export const sharedDataProvider = createProvider({
	providerName: 'SharedDataProvider',
	contextName: 'sharedData',
	useValue: () => {
		const providers = useProviders([coreServicesProvider, toastProvider])
		const currentUser = useFindCurrentUser(providers)
		const allRoles = useFindAllRoles(providers)
		const allPermissions = useFindAllPermissions(providers)

		useEffect(() => {
			Promise.all([currentUser.execute(), allRoles.execute(), allPermissions.execute()])
		}, [])

		return { currentUser, allRoles, allPermissions }
	},
})
