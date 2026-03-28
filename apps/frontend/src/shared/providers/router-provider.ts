import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { createProvider } from './provider-utils'

export const routerProvider = createProvider('RouterProvider', () => {
	const navigate = useNavigate()
	const params = useParams()
	const location = useLocation()
	return { navigate, params, location }
})
