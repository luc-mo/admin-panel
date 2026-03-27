import { createProvider } from '@/shared/providers/provider-utils'
import { config } from '@/shared/config'

export const configProvider = createProvider('ConfigProvider', () => {
	return { config }
})
