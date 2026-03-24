import { createContainer, InjectionMode, asValue, asClass } from 'awilix'
import admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'

import { config } from '@/infrastructure/config'
import { FirebaseCloudSdkService } from '@/infrastructure/services/cloud-sdk-service'
import { FirebaseAuthService } from '@/infrastructure/services/auth-service'
import { ControllerFactory } from '@/infrastructure/http/controller-factory'

import { FirebaseDbHandler } from '@/infrastructure/persistence/db-handler'
import { UserRepository } from '@/infrastructure/persistence/user/repository'
import { RoleRepository } from '@/infrastructure/persistence/role/repository'
import { PermissionRepository } from '@/infrastructure/persistence/permission/repository'
import { EndpointRepository } from '@/infrastructure/persistence/endpoint/repository'

import { UserDocumentParser } from '@/infrastructure/persistence/user/document-parser'
import { RoleDocumentParser } from '@/infrastructure/persistence/role/document-parser'
import { PermissionDocumentParser } from '@/infrastructure/persistence/permission/document-parser'
import { EndpointDocumentParser } from '@/infrastructure/persistence/endpoint/document-parser'

import { IdGenerator } from './domain/services/id-generator'

import { HealthCheck } from '@/application/health-check'
import { CheckUserPermissions } from '@/application/auth/check-user-permissions'
import { FindUsers } from '@/application/user/find-users'
import { FindUserById } from '@/application/user/find-user-by-id'
import { CreateUser } from '@/application/user/create-user'
import { UpdateUser } from '@/application/user/update-user'
import { RemoveUser } from '@/application/user/remove-user'
import { FindRoles } from '@/application/role/find-roles'
import { FindRoleById } from '@/application/role/find-role-by-id'
import { CreateRole } from '@/application/role/create-role'
import { UpdateRole } from '@/application/role/update-role'
import { RemoveRole } from '@/application/role/remove-role'
import { FindPermissions } from '@/application/permission/find-permissions'
import { FindPermissionById } from '@/application/permission/find-permission-by-id'
import { CreatePermission } from '@/application/permission/create-permission'
import { UpdatePermission } from '@/application/permission/update-permission'
import { RemovePermission } from '@/application/permission/remove-permission'
import { FindEndpoints } from '@/application/endpoint/find-endpoints'
import { FindEndpointById } from '@/application/endpoint/find-endpoint-by-id'
import { CreateEndpoint } from '@/application/endpoint/create-endpoint'
import { UpdateEndpoint } from '@/application/endpoint/update-endpoint'
import { RemoveEndpoint } from '@/application/endpoint/remove-endpoint'
import type { IContainer } from '@/types/container'

const container = createContainer<IContainer>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	admin: asValue(admin),
	express: asValue(express),
	cors: asValue(cors),

	config: asValue(config),
	cloudSdkService: asClass(FirebaseCloudSdkService).singleton(),
	authService: asClass(FirebaseAuthService).singleton(),
	controllerFactory: asClass(ControllerFactory).singleton(),

	dbHandler: asClass(FirebaseDbHandler).singleton(),
	userRepository: asClass(UserRepository),
	roleRepository: asClass(RoleRepository),
	permissionRepository: asClass(PermissionRepository),
	endpointRepository: asClass(EndpointRepository),

	userDocumentParser: asClass(UserDocumentParser),
	roleDocumentParser: asClass(RoleDocumentParser),
	permissionDocumentParser: asClass(PermissionDocumentParser),
	endpointDocumentParser: asClass(EndpointDocumentParser),

	idGenerator: asClass(IdGenerator),

	healthCheck: asClass(HealthCheck),
	checkUserPermissions: asClass(CheckUserPermissions),
	findUsers: asClass(FindUsers),
	findUserById: asClass(FindUserById),
	createUser: asClass(CreateUser),
	updateUser: asClass(UpdateUser),
	removeUser: asClass(RemoveUser),
	findRoles: asClass(FindRoles),
	findRoleById: asClass(FindRoleById),
	createRole: asClass(CreateRole),
	updateRole: asClass(UpdateRole),
	removeRole: asClass(RemoveRole),
	findPermissions: asClass(FindPermissions),
	findPermissionById: asClass(FindPermissionById),
	createPermission: asClass(CreatePermission),
	updatePermission: asClass(UpdatePermission),
	removePermission: asClass(RemovePermission),
	findEndpoints: asClass(FindEndpoints),
	findEndpointById: asClass(FindEndpointById),
	createEndpoint: asClass(CreateEndpoint),
	updateEndpoint: asClass(UpdateEndpoint),
	removeEndpoint: asClass(RemoveEndpoint),
} as Record<keyof IContainer, any>)

export { container }
