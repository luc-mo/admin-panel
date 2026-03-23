export interface IContainer {
	admin: typeof import('firebase-admin')
	express: typeof import('express')
	cors: typeof import('cors')

	config: typeof import('@/infrastructure/config').config
	cloudSdkService: import('@/infrastructure/services/cloud-sdk-service').FirebaseCloudSdkService
	authService: import('@/infrastructure/services/auth-service').FirebaseAuthService
	controllerFactory: import('@/infrastructure/http/controller-factory').ControllerFactory

	dbHandler: import('@/infrastructure/persistence/db-handler').FirebaseDbHandler
	userRepository: import('@/infrastructure/persistence/user/repository').UserRepository
	roleRepository: import('@/infrastructure/persistence/role/repository').RoleRepository
	permissionRepository: import('@/infrastructure/persistence/permission/repository').PermissionRepository
	endpointRepository: import('@/infrastructure/persistence/endpoint/repository').EndpointRepository

	userDocumentParser: import('@/infrastructure/persistence/user/document-parser').UserDocumentParser
	roleDocumentParser: import('@/infrastructure/persistence/role/document-parser').RoleDocumentParser
	permissionDocumentParser: import('@/infrastructure/persistence/permission/document-parser').PermissionDocumentParser
	endpointDocumentParser: import('@/infrastructure/persistence/endpoint/document-parser').EndpointDocumentParser

	idGenerator: import('@/domain/services/id-generator').IdGenerator

	healthCheck: import('@/application/health-check').HealthCheck
	findUsers: import('@/application/user/find-users').FindUsers
	findUserById: import('@/application/user/find-user-by-id').FindUserById
	createUser: import('@/application/user/create-user').CreateUser
}
