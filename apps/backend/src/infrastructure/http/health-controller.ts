import { container } from '@/container'
import { loggerMiddleware } from './middlewares/logger-middleware'

export const healthController = container.resolve('controllerFactory').createController({
	path: '/api/health',
	middlewares: [loggerMiddleware],
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
