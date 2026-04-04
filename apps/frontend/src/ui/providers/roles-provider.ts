import { createProvider } from './utils/create-provider'
import { useProviders } from './utils/use-providers'

import { useFindAllRoles } from '@/application/role/use-find-all-roles'
import { coreServicesProvider } from './core-services-provider'
import { toastProvider } from './toast-provider'

export const allRolesProvider = createProvider({
	providerName: 'AllRolesProvider',
	contextName: 'allRoles',
	useValue: () => {
		const providers = useProviders([coreServicesProvider, toastProvider])
		return useFindAllRoles(providers)
	},
})
