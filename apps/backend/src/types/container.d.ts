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

	// Miscellaneous
	healthCheck: import('@/application/health-check').HealthCheck
	checkUserRoles: import('@/application/auth/check-user-roles').CheckUserRoles

	// User
	findUsers: import('@/application/user/find-users').FindUsers
	findUserById: import('@/application/user/find-user-by-id').FindUserById
	createUser: import('@/application/user/create-user').CreateUser
	updateUser: import('@/application/user/update-user').UpdateUser
	removeUser: import('@/application/user/remove-user').RemoveUser

	// Role
	findRoles: import('@/application/role/find-roles').FindRoles
	findAllRoles: import('@/application/role/find-all-roles').FindAllRoles
	findRoleById: import('@/application/role/find-role-by-id').FindRoleById
	createRole: import('@/application/role/create-role').CreateRole
	updateRole: import('@/application/role/update-role').UpdateRole
	removeRole: import('@/application/role/remove-role').RemoveRole

	// Permission
	findPermissions: import('@/application/permission/find-permissions').FindPermissions
	findPermissionById: import('@/application/permission/find-permission-by-id').FindPermissionById
	createPermission: import('@/application/permission/create-permission').CreatePermission
	updatePermission: import('@/application/permission/update-permission').UpdatePermission
	removePermission: import('@/application/permission/remove-permission').RemovePermission

	// Endpoint
	findEndpoints: import('@/application/endpoint/find-endpoints').FindEndpoints
	findEndpointById: import('@/application/endpoint/find-endpoint-by-id').FindEndpointById
	createEndpoint: import('@/application/endpoint/create-endpoint').CreateEndpoint
	updateEndpoint: import('@/application/endpoint/update-endpoint').UpdateEndpoint
	removeEndpoint: import('@/application/endpoint/remove-endpoint').RemoveEndpoint
}
