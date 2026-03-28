import { Outlet } from 'react-router-dom'
import { withProviders } from '@/shared/providers/provider-utils'
import { configProvider } from '@/shared/providers/config-provider'
import { servicesProvider } from '@/shared/providers/services-provider'

export const App: React.FC = withProviders(() => {
	return <Outlet />
}, [configProvider, servicesProvider])
