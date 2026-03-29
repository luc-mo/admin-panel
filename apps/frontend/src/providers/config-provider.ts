import { createProvider } from './utils/create-provider'
import { config } from '@/config'

export const configProvider = createProvider({
	providerName: 'ConfigProvider',
	contextName: 'config',
	useValue: () => config,
})
