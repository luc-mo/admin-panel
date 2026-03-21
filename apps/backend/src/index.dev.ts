import '@/infrastructure/config/logger'
import { config } from '@/infrastructure/config'

import { container } from '@/container'
import { healthController } from '@/infrastructure/http/health-controller'

const app = container.resolve('controllerFactory').createApp({
	port: config.server.port,
	middlewares: [],
	controllers: [healthController],
})

app.listen()
