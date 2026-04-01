import { createProvider } from './utils/create-provider'
import { config } from '@/infrastructure/config'

export type IConfigContext = typeof config

export const configProvider = createProvider({
	providerName: 'ConfigProvider',
	contextName: 'config',
	useValue: (): IConfigContext => config,
})
