import '@/infrastructure/config/logger'
import { config } from '@/infrastructure/config'

import { container } from '@/container'
import { healthController } from '@/infrastructure/http/health-controller'
import { usersController } from '@/infrastructure/http/users-controller'

const app = container.resolve('controllerFactory').createApp({
	port: config.server.port,
	middlewares: [],
	controllers: [healthController, usersController],
})

app.listen()
