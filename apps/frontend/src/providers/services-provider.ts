import { createProvider } from './utils/create-provider'
import { cloudSdkService } from '@/services/cloud-sdk-service'
import { authService } from '@/services/auth-service'
import { httpService } from '@/services/http-service'
import { localStorageService } from '@/services/local-storage-service'

export const servicesProvider = createProvider({
	providerName: 'ServicesProvider',
	contextName: 'services',
	useValue: () => {
		return {
			cloudSdk: cloudSdkService,
			auth: authService,
			http: httpService,
			localStorage: localStorageService,
		}
	},
})
