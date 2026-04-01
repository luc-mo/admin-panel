import { Outlet } from 'react-router-dom'
import { withProviders } from '@/ui/providers/utils/with-providers'
import { configProvider } from '@/ui/providers/config-provider'
import { toastProvider } from '@/ui/providers/toast-provider'
import { servicesProvider } from '@/ui/providers/services-provider'
import { routerProvider } from '@/ui/providers/router-provider'
import { authProvider } from '@/ui/providers/auth-provider'

const providers = [configProvider, servicesProvider, routerProvider, toastProvider, authProvider]
export const App: React.FC = withProviders(providers, () => {
	return <Outlet />
})
