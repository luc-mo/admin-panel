import { onRequest } from 'firebase-functions/v2/https'
import { healthController } from './infrastructure/http/health-controller'
import { usersController } from './infrastructure/http/users-controller'
import { rolesController } from './infrastructure/http/roles-controller'
import { permissionsController } from './infrastructure/http/permissions-controller'
import { endpointsController } from './infrastructure/http/endpoints-controller'
import type { Express } from 'express'

export const health = onRequest(healthController.router as Express)
export const users = onRequest(usersController.router as Express)
export const roles = onRequest(rolesController.router as Express)
export const permissions = onRequest(permissionsController.router as Express)
export const endpoints = onRequest(endpointsController.router as Express)
