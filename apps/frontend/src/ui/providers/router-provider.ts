import {
	useNavigate,
	useParams,
	useLocation,
	type NavigateFunction,
	type Params,
	type Location,
} from 'react-router-dom'
import { createProvider } from './utils/create-provider'

export interface IRouterContext {
	navigate: NavigateFunction
	params: Readonly<Params<string>>
	location: Location<any>
}

export const routerProvider = createProvider({
	providerName: 'RouterProvider',
	contextName: 'router',
	useValue: (): IRouterContext => {
		const navigate = useNavigate()
		const params = useParams()
		const location = useLocation()
		return { navigate, params, location }
	},
})
