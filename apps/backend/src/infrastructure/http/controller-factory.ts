import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import type { Express, Request, RequestHandler } from 'express'

@Logger({ severity: 'TRACE' })
export class ControllerFactory extends InjectableDependency('express', 'cors') {
	public createApp({ port, middlewares, controllers }: IAppConfig): IApp {
		const router = this._express()
		middlewares.forEach((middleware) => {
			router.use(middleware)
		})
		controllers.forEach((controller) => {
			router.use(controller.path, controller.router)
		})
		return {
			port,
			router,
			listen: () => {
				router.listen(port, () => {
					Logger.info(`[Http] Server up and running on: http://localhost:${port}`)
				})
			},
		}
	}

	public createController({ path, middlewares, endpoints }: IControllerConfig): IController {
		const router = this._express()
		router.use(
			this._cors(),
			this._express.json({
				verify: (req: Request, _, buf) => {
					req.rawBody = buf
				},
			}),
			(req, _, next) => {
				req.context = {}
				next()
			}
		)

		endpoints.forEach((endpoint) => {
			if (!endpoint.overrides) return
			router[endpoint.method](endpoint.path, ...endpoint.overrides)
		})
		middlewares.forEach((middleware) => {
			router.use(middleware)
		})
		endpoints.forEach((endpoint) => {
			router[endpoint.method](endpoint.path, ...(endpoint.middlewares ?? []), endpoint.handler)
		})
		return { path, router }
	}
}

// Return types
interface IApp {
	port: string
	router: Express
	listen: () => void
}

interface IController {
	path: string
	router: Express
}

// Configs
interface IAppConfig {
	port: string
	middlewares: RequestHandler[]
	controllers: IController[]
}

interface IControllerConfig {
	path: string
	middlewares: RequestHandler[]
	endpoints: IEndpointConfig[]
}

interface IEndpointConfig {
	method: 'get' | 'post' | 'put' | 'patch' | 'delete'
	path: string
	overrides?: RequestHandler[]
	middlewares?: RequestHandler[]
	handler: RequestHandler
}
