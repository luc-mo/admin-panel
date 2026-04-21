import { container } from '@/container'
import { jsonMiddleware } from './middlewares/json-middleware'
import { contextMiddleware } from './middlewares/context-middleware'
import { loggerMiddleware } from './middlewares/logger-middleware'

export const healthController = container.resolve('controllerFactory').createController({
	type: 'app',
	path: '/health',
	corsOptions: true,
	middlewares: [jsonMiddleware, contextMiddleware, loggerMiddleware],
	endpoints: [
		{
			method: 'get',
			path: '/',
			middlewares: [],
			handler: async (_, res) => {
				const healthCheck = container.resolve('healthCheck')
				const response = await healthCheck.execute()
				res.status(200).send(response)
			},
		},
	],
})
