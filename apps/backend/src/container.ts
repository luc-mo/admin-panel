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
import { FindUsers } from '@/application/user/find-users'
import { FindUserById } from '@/application/user/find-user-by-id'
import { CreateUser } from '@/application/user/create-user'
import { UpdateUser } from '@/application/user/update-user'
import { RemoveUser } from '@/application/user/remove-user'
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
	findUsers: asClass(FindUsers),
	findUserById: asClass(FindUserById),
	createUser: asClass(CreateUser),
	updateUser: asClass(UpdateUser),
	removeUser: asClass(RemoveUser),
} as Record<keyof IContainer, any>)

export { container }
