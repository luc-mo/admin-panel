import { Outlet } from 'react-router-dom'
import { withProviders } from '@/providers/utils/with-providers'
import { configProvider } from '@/providers/config-provider'
import { servicesProvider } from '@/providers/services-provider'
import { authProvider } from './providers/auth-provider'
import { routerProvider } from './providers/router-provider'

export const App: React.FC = withProviders(
	[configProvider, servicesProvider, routerProvider, authProvider],
	() => {
		return <Outlet />
	}
)
