import { createContainer, InjectionMode, asValue, asClass } from 'awilix'
import admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'

import { config } from '@/infrastructure/config'
import { FirebaseCloudSdkService } from '@/infrastructure/services/cloud-sdk-service'
import { FirebaseAuthService } from '@/infrastructure/services/auth-service'
import { FirebaseDbHandler } from '@/infrastructure/persistence/db-handler'
import { ControllerFactory } from '@/infrastructure/http/controller-factory'

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
	dbHandler: asClass(FirebaseDbHandler).singleton(),
	controllerFactory: asClass(ControllerFactory).singleton(),

	idGenerator: asClass(IdGenerator),

	healthCheck: asClass(HealthCheck),
} as Record<keyof IContainer, any>)

export { container }
