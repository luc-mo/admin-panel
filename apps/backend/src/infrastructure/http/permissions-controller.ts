import { container } from '@/container'
import { jsonMiddleware } from './middlewares/json-middleware'
import { contextMiddleware } from './middlewares/context-middleware'
import { loggerMiddleware } from './middlewares/logger-middleware'
import { accessTokenMiddleware } from './middlewares/access-token-middleware'
import { userRolesMiddleware } from './middlewares/user-roles-middleware'

import { FindPermissionsCommand } from '@/application/permission/find-permissions/command'
import { FindPermissionByIdCommand } from '@/application/permission/find-permission-by-id/command'
import { CreatePermissionCommand } from '@/application/permission/create-permission/command'
import { UpdatePermissionCommand } from '@/application/permission/update-permission/command'
import { RemovePermissionCommand } from '@/application/permission/remove-permission/command'

export const permissionsController = container.resolve('controllerFactory').createController({
	type: 'app',
	path: '/api/permissions',
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
				const command = new FindPermissionsCommand({
					limit: Number.parseInt(req.query.limit as string, 10) || 10,
					offset: Number.parseInt(req.query.offset as string, 10) || 0,
				})
				const findPermissions = container.resolve('findPermissions')
				const response = await findPermissions.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'get',
			path: '/all',
			middlewares: [],
			handler: async (_, res) => {
				const findAllPermissions = container.resolve('findAllPermissions')
				const response = await findAllPermissions.execute()
				res.status(200).send(response)
			},
		},
		{
			method: 'get',
			path: '/:id',
			middlewares: [],
			handler: async (req, res) => {
				const id = req.params.id as string
				const command = new FindPermissionByIdCommand({ id })
				const findPermissionById = container.resolve('findPermissionById')
				const response = await findPermissionById.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'post',
			path: '/',
			middlewares: [],
			handler: async (req, res) => {
				const command = new CreatePermissionCommand({
					key: req.body.key,
					name: req.body.name,
				})
				const createPermission = container.resolve('createPermission')
				const response = await createPermission.execute(command)
				res.status(201).send(response)
			},
		},
		{
			method: 'patch',
			path: '/:id',
			middlewares: [],
			handler: async (req, res) => {
				const command = new UpdatePermissionCommand({
					id: req.params.id as string,
					key: req.body.key,
					name: req.body.name,
				})
				const updatePermission = container.resolve('updatePermission')
				const response = await updatePermission.execute(command)
				res.status(200).send(response)
			},
		},
		{
			method: 'delete',
			path: '/:id',
			middlewares: [],
			handler: async (req, res) => {
				const id = req.params.id as string
				const command = new RemovePermissionCommand({ id })
				const removePermission = container.resolve('removePermission')
				const response = await removePermission.execute(command)
				res.status(200).send(response)
			},
		},
	],
})
