import { container } from '@/container'
import { loggerMiddleware } from './middlewares/logger-middleware'
import { FindEndpointsCommand } from '@/application/endpoint/find-endpoints/command'
import { FindEndpointByIdCommand } from '@/application/endpoint/find-endpoint-by-id/command'
import { CreateEndpointCommand } from '@/application/endpoint/create-endpoint/command'
import { UpdateEndpointCommand } from '@/application/endpoint/update-endpoint/command'
import { RemoveEndpointCommand } from '@/application/endpoint/remove-endpoint/command'

export const endpointsController = container.resolve('controllerFactory').createController({
	path: '/api/endpoints',
	middlewares: [loggerMiddleware],
	endpoints: [
		{
			method: 'get',
			path: '/',
			middlewares: [],
			handler: async (req, res) => {
				const command = new FindEndpointsCommand({
					limit: Number.parseInt(req.query.limit as string, 10) || 10,
					offset: Number.parseInt(req.query.offset as string, 10) || 0,
				})
				const findEndpoints = container.resolve('findEndpoints')
				const response = await findEndpoints.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'get',
			path: '/:id',
			middlewares: [],
			handler: async (req, res) => {
				const id = req.params.id as string
				const command = new FindEndpointByIdCommand({ id })
				const findEndpointById = container.resolve('findEndpointById')
				const response = await findEndpointById.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'post',
			path: '/',
			middlewares: [],
			handler: async (req, res) => {
				const command = new CreateEndpointCommand({
					path: req.body.path,
					permissions: req.body.permissions,
				})
				const createEndpoint = container.resolve('createEndpoint')
				const response = await createEndpoint.execute(command)
				res.status(201).send(response)
			},
		},
		{
			method: 'patch',
			path: '/:id',
			middlewares: [],
			handler: async (req, res) => {
				const command = new UpdateEndpointCommand({
					id: req.params.id as string,
					path: req.body.path,
					permissions: req.body.permissions,
				})
				const updateEndpoint = container.resolve('updateEndpoint')
				const response = await updateEndpoint.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'delete',
			path: '/:id',
			middlewares: [],
			handler: async (req, res) => {
				const id = req.params.id as string
				const command = new RemoveEndpointCommand({ id })
				const removeEndpoint = container.resolve('removeEndpoint')
				const response = await removeEndpoint.execute(command)
				res.status(200).send(response)
			},
		},
	],
})
