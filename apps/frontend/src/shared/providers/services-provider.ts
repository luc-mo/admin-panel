import { createProvider } from '@/shared/providers/utils/create-provider'
import { cloudSdkService } from '@/shared/services/cloud-sdk-service'
import { authService } from '@/shared/services/auth-service'
import { localStorageService } from '@/shared/services/local-storage-service'

export const servicesProvider = createProvider({
	providerName: 'ServicesProvider',
	contextName: 'services',
	useValue: () => {
		return {
			cloudSdk: cloudSdkService,
			auth: authService,
			localStorage: localStorageService,
		}
	},
})
