import { Outlet } from 'react-router-dom'
import { withProviders } from './shared/providers/utils/with-providers'
import { configProvider } from '@/shared/providers/config-provider'
import { servicesProvider } from '@/shared/providers/services-provider'

export const App: React.FC = withProviders([configProvider, servicesProvider], () => {
	return <Outlet />
})
