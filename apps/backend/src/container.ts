import { createContainer, InjectionMode, asValue, asClass } from 'awilix'
import admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'

import { config } from '@/infrastructure/config'
import { FirebaseCloudSdkService } from '@/infrastructure/services/cloud-sdk-service'
import { FirebaseAuthService } from '@/infrastructure/services/auth-service'
import { ControllerFactory } from '@/infrastructure/http/controller-factory'

import { FirebaseDbHandler } from '@/infrastructure/persistence/db-handler'
import { UserDocumentParser } from '@/infrastructure/persistence/user/document-parser'
import { RoleDocumentParser } from '@/infrastructure/persistence/role/document-parser'
import { PermissionDocumentParser } from '@/infrastructure/persistence/permission/document-parser'
import { EndpointDocumentParser } from '@/infrastructure/persistence/endpoint/document-parser'

import { IdGenerator } from './domain/services/id-generator'

import { HealthCheck } from '@/application/health-check'
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
	userDocumentParser: asClass(UserDocumentParser),
	roleDocumentParser: asClass(RoleDocumentParser),
	permissionDocumentParser: asClass(PermissionDocumentParser),
	endpointDocumentParser: asClass(EndpointDocumentParser),

	idGenerator: asClass(IdGenerator),

	healthCheck: asClass(HealthCheck),
} as Record<keyof IContainer, any>)

export { container }
