import { createContainer, InjectionMode, asValue, asClass } from 'awilix'
import admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'

import { config } from '@/infrastructure/config'
import { ControllerFactory } from '@/infrastructure/http/controller-factory'

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
	controllerFactory: asClass(ControllerFactory).singleton(),

	healthCheck: asClass(HealthCheck).singleton(),
})

export { container }
