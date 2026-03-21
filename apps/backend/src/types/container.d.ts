export interface IContainer {
	admin: typeof import('firebase-admin')
	express: typeof import('express')
	cors: typeof import('cors')

	config: typeof import('@/infrastructure/config').config
	controllerFactory: import('@/infrastructure/http/controller-factory').ControllerFactory

	healthCheck: import('@/application/health-check').HealthCheck
}
