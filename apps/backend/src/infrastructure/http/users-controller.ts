import { container } from '@/container'
import { loggerMiddleware } from './middlewares/logger-middleware'
import { CreateUserCommand } from '@/application/user/create-user/command'

export const usersController = container.resolve('controllerFactory').createController({
	path: '/api/users',
	middlewares: [loggerMiddleware],
	endpoints: [
		{
			method: 'put',
			path: '/:id',
			middlewares: [],
			handler: async (req, res) => {
				const command = new CreateUserCommand({
					id: req.params.id as string,
					email: req.body.email,
					username: req.body.username,
					password: req.body.password,
					displayName: req.body.displayName,
				})
				const createUser = container.resolve('createUser')
				const response = await createUser.execute(command)
				res.status(200).send(response)
			},
		},
	],
})
