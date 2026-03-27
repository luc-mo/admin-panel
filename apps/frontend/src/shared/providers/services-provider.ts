import { createProvider } from '@/shared/providers/provider-utils'
import { cloudSdkService } from '@/shared/services/cloud-sdk-service'
import { authService } from '@/shared/services/auth-service'
import { localStorageService } from '@/shared/services/local-storage-service'

export const servicesProvider = createProvider('ServicesProvider', () => {
	return {
		cloudSdkService,
		authService,
		localStorageService,
	}
})
