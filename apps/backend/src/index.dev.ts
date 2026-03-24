import '@/infrastructure/config/logger'
import { config } from '@/infrastructure/config'

import { container } from '@/container'
import { healthController } from '@/infrastructure/http/health-controller'
import { usersController } from '@/infrastructure/http/users-controller'
import { rolesController } from '@/infrastructure/http/roles-controller'
import { permissionsController } from '@/infrastructure/http/permissions-controller'
import { endpointsController } from '@/infrastructure/http/endpoints-controller'

const app = container.resolve('controllerFactory').createApp({
	port: config.server.port,
	middlewares: [],
	controllers: [
		healthController,
		usersController,
		rolesController,
		permissionsController,
		endpointsController,
	],
})

app.listen()
