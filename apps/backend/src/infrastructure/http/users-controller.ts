import { container } from '@/container'
import { contextMiddleware } from './middlewares/context-middleware'
import { loggerMiddleware } from './middlewares/logger-middleware'
import { accessTokenMiddleware } from './middlewares/access-token-middleware'
import { userRolesMiddleware } from './middlewares/user-roles-middleware'

import { FindUsersCommand } from '@/application/user/find-users/command'
import { FindUserByIdCommand } from '@/application/user/find-user-by-id/command'
import { CreateUserCommand } from '@/application/user/create-user/command'
import { UpdateUserCommand } from '@/application/user/update-user/command'
import { RemoveUserCommand } from '@/application/user/remove-user/command'

export const usersController = container.resolve('controllerFactory').createController({
	type: 'app',
	path: '/api/users',
	corsOptions: true,
	middlewares: [contextMiddleware, loggerMiddleware, accessTokenMiddleware, userRolesMiddleware],
	endpoints: [
		{
			method: 'get',
			path: '/',
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
			method: 'get',
			path: '/me',
			overrides: [userRolesMiddleware.bypass],
			handler: async (req, res) => {
				const id = req.authUser.uid
				const command = new FindUserByIdCommand({ id })
				const findUserById = container.resolve('findUserById')
				const response = await findUserById.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'get',
			path: '/:id',
			handler: async (req, res) => {
				const id = req.params.id as string
				const command = new FindUserByIdCommand({ id })
				const findUserById = container.resolve('findUserById')
				const response = await findUserById.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'post',
			path: '/',
			handler: async (req, res) => {
				const command = new CreateUserCommand({
					email: req.body.email,
					username: req.body.username,
					password: req.body.password,
					roles: req.body.roles,
				})
				const createUser = container.resolve('createUser')
				const response = await createUser.execute(command)
				res.status(201).send(response)
			},
		},
		{
			method: 'patch',
			path: '/:id',
			handler: async (req, res) => {
				const command = new UpdateUserCommand({
					id: req.params.id as string,
					username: req.body.username,
					roles: req.body.roles,
				})
				const updateUser = container.resolve('updateUser')
				const response = await updateUser.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'delete',
			path: '/:id',
			handler: async (req, res) => {
				const id = req.params.id as string
				const command = new RemoveUserCommand({ id })
				const removeUser = container.resolve('removeUser')
				const response = await removeUser.execute(command)
				res.status(200).send(response)
			},
		},
	],
})
