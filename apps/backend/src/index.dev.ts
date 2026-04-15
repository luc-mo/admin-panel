import '@/infrastructure/config/logger'

import { Logger } from '@snowdrive/logger'
import { container } from '@/container'
import { config } from '@/infrastructure/config'
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

app.listen(() => {
	Logger.info(`[Http] Server up and running on: http://localhost:${app.port}`)
})
