import { container } from '@/container'
import { jsonMiddleware } from './middlewares/json-middleware'
import { contextMiddleware } from './middlewares/context-middleware'
import { loggerMiddleware } from './middlewares/logger-middleware'
import { accessTokenMiddleware } from './middlewares/access-token-middleware'
import { userRolesMiddleware } from './middlewares/user-roles-middleware'

import { FindRolesCommand } from '@/application/role/find-roles/command'
import { FindRoleByIdCommand } from '@/application/role/find-role-by-id/command'
import { CreateRoleCommand } from '@/application/role/create-role/command'
import { UpdateRoleCommand } from '@/application/role/update-role/command'
import { RemoveRoleCommand } from '@/application/role/remove-role/command'

export const rolesController = container.resolve('controllerFactory').createController({
	type: 'app',
	path: '/roles',
	corsOptions: true,
	middlewares: [
		jsonMiddleware,
		contextMiddleware,
		loggerMiddleware,
		accessTokenMiddleware,
		userRolesMiddleware,
	],
	endpoints: [
		{
			method: 'get',
			path: '/',
			middlewares: [],
			handler: async (req, res) => {
				const command = new FindRolesCommand({
					limit: Number.parseInt(req.query.limit as string, 10) || 10,
					offset: Number.parseInt(req.query.offset as string, 10) || 0,
				})
				const findRoles = container.resolve('findRoles')
				const response = await findRoles.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'get',
			path: '/all',
			middlewares: [],
			handler: async (_, res) => {
				const findAllRoles = container.resolve('findAllRoles')
				const response = await findAllRoles.execute()
				res.status(200).send(response)
			},
		},
		{
			method: 'get',
			path: '/:id',
			middlewares: [],
			handler: async (req, res) => {
				const id = req.params.id as string
				const command = new FindRoleByIdCommand({ id })
				const findRoleById = container.resolve('findRoleById')
				const response = await findRoleById.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'post',
			path: '/',
			middlewares: [],
			handler: async (req, res) => {
				const command = new CreateRoleCommand({
					name: req.body.name,
					description: req.body.description,
					permissions: req.body.permissions,
					category: req.body.category,
				})
				const createRole = container.resolve('createRole')
				const response = await createRole.execute(command)
				res.status(201).send(response)
			},
		},
		{
			method: 'patch',
			path: '/:id',
			middlewares: [],
			handler: async (req, res) => {
				const command = new UpdateRoleCommand({
					id: req.params.id as string,
					name: req.body.name,
					description: req.body.description,
					permissions: req.body.permissions,
					category: req.body.category,
				})
				const updateRole = container.resolve('updateRole')
				const response = await updateRole.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'delete',
			path: '/:id',
			middlewares: [],
			handler: async (req, res) => {
				const id = req.params.id as string
				const command = new RemoveRoleCommand({ id })
				const removeRole = container.resolve('removeRole')
				const response = await removeRole.execute(command)
				res.status(200).send(response)
			},
		},
	],
})
