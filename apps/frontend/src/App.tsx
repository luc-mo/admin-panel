import { Outlet } from 'react-router-dom'
import { withProviders } from '@/providers/utils/with-providers'
import { configProvider } from '@/providers/config-provider'
import { servicesProvider } from '@/providers/services-provider'

export const App: React.FC = withProviders([configProvider, servicesProvider], () => {
	return <Outlet />
})
