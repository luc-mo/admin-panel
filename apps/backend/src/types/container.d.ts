export interface IContainer {
	admin: typeof import('firebase-admin')
	express: typeof import('express')
	cors: typeof import('cors')

	config: typeof import('@/infrastructure/config').config
	cloudSdkService: import('@/infrastructure/services/cloud-sdk-service').FirebaseCloudSdkService
	authService: import('@/infrastructure/services/auth-service').FirebaseAuthService
	dbHandler: import('@/infrastructure/persistence/db-handler').FirebaseDbHandler
	controllerFactory: import('@/infrastructure/http/controller-factory').ControllerFactory

	idGenerator: import('@/domain/services/id-generator').IdGenerator

	healthCheck: import('@/application/health-check').HealthCheck
}
