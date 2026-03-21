export interface IContainer {
	admin: typeof import('firebase-admin')
	express: typeof import('express')
	cors: typeof import('cors')

	config: typeof import('@/infrastructure/config').config
	cloudSdkService: import('@/infrastructure/services/cloud-sdk-service').FirebaseCloudSdkService
	authService: import('@/infrastructure/services/auth-service').FirebaseAuthService
	controllerFactory: import('@/infrastructure/http/controller-factory').ControllerFactory

	dbHandler: import('@/infrastructure/persistence/db-handler').FirebaseDbHandler
	userDocumentParser: import('@/infrastructure/persistence/user/document-parser').UserDocumentParser
	roleDocumentParser: import('@/infrastructure/persistence/role/document-parser').RoleDocumentParser
	permissionDocumentParser: import('@/infrastructure/persistence/permission/document-parser').PermissionDocumentParser
	endpointDocumentParser: import('@/infrastructure/persistence/endpoint/document-parser').EndpointDocumentParser

	idGenerator: import('@/domain/services/id-generator').IdGenerator

	healthCheck: import('@/application/health-check').HealthCheck
}
