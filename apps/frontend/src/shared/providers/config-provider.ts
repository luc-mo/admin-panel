import { createProvider } from '@/shared/providers/utils/create-provider'
import { config } from '@/shared/config'

export const configProvider = createProvider({
	providerName: 'ConfigProvider',
	contextName: 'config',
	useValue: () => config,
})
