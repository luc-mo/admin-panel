import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { createProvider } from './utils/create-provider'

export const routerProvider = createProvider({
	providerName: 'RouterProvider',
	contextName: 'router',
	useValue: () => {
		const navigate = useNavigate()
		const params = useParams()
		const location = useLocation()
		return { navigate, params, location }
	},
})
