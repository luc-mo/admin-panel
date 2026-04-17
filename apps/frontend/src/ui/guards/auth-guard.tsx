import { Navigate, Outlet } from 'react-router-dom'
import { authProvider } from '@/ui/providers/auth-provider'

interface IAuthGuardProps {
	visibility: 'private' | 'public'
}

export const AuthGuard: React.FC<IAuthGuardProps> = ({ visibility }) => {
	const { session, loadings } = authProvider.use()
	if (loadings.session) return null
	if (visibility === 'public' && session.accessToken) return <Navigate to="/dashboard" replace />
	if (visibility === 'private' && !session.accessToken) return <Navigate to="/auth/login" replace />
	return <Outlet />
}
