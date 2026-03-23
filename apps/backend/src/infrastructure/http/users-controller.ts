import { container } from '@/container'
import { loggerMiddleware } from './middlewares/logger-middleware'
import { FindUsersCommand } from '@/application/user/find-users/command'
import { CreateUserCommand } from '@/application/user/create-user/command'

export const usersController = container.resolve('controllerFactory').createController({
	path: '/api/users',
	middlewares: [loggerMiddleware],
	endpoints: [
		{
			method: 'get',
			path: '/',
			middlewares: [],
			handler: async (req, res) => {
				const command = new FindUsersCommand({
					limit: Number.parseInt(req.query.limit as string, 10) || 10,
					offset: Number.parseInt(req.query.offset as string, 10) || 0,
				})
				const findUsers = container.resolve('findUsers')
				const response = await findUsers.execute(command)
				res.status(200).send(response)
			},
		},
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
