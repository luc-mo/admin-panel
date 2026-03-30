import { Outlet } from 'react-router-dom'
import { withProviders } from '@/providers/utils/with-providers'
import { configProvider } from '@/providers/config-provider'
import { servicesProvider } from '@/providers/services-provider'
import { routerProvider } from './providers/router-provider'
import { authProvider } from './providers/auth-provider'

const providers = [configProvider, servicesProvider, routerProvider, authProvider]
export const App: React.FC = withProviders(providers, () => {
	return <Outlet />
})
