import { createProvider } from './utils/create-provider'
import { cloudSdkService } from '@/infrastructure/services/cloud-sdk-service'
import { authService } from '@/infrastructure/services/auth-service'
import { httpService } from '@/infrastructure/services/http-service'
import { localStorageService } from '@/infrastructure/services/local-storage-service'

export interface IServicesContext {
	cloudSdk: typeof cloudSdkService
	auth: typeof authService
	http: typeof httpService
	localStorage: typeof localStorageService
}

export const servicesProvider = createProvider({
	providerName: 'ServicesProvider',
	contextName: 'services',
	useValue: (): IServicesContext => {
		return {
			cloudSdk: cloudSdkService,
			auth: authService,
			http: httpService,
			localStorage: localStorageService,
		}
	},
})
