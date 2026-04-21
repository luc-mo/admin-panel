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
	middlewares: [
		// async (_req, _res, next) => {
		// 	const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time))
		// 	await delay(1000)
		// 	next()
		// },
	],
	controllers: [
		healthController,
		usersController,
		rolesController,
		permissionsController,
		endpointsController,
	],
})

app.listen(async () => {
	try {
		await container.resolve('cacheEndpoints').execute()
		Logger.info(`[Http] Server up and running on: http://localhost:${app.port}`)
	} catch (error) {
		Logger.error('[Http] Failed to start server', { error })
		process.exit(1)
	}
})
