import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { Endpoint } from '@admin-panel/core'
import { CachedEndpoint } from '@/domain/cached-endpoint'
import { CreateEndpointResponse } from './response'
import type { CreateEndpointCommand } from './command'

@Logger({ severity: 'INFO' })
export class CreateEndpoint extends InjectableDependency(
	'idGenerator',
	'endpointRepository',
	'cachedEndpointRepository'
) {
	public async execute(command: CreateEndpointCommand) {
		const endpointId = this._idGenerator.uuid()
		await this._assertEndpointDoesNotExist(endpointId, command.method, command.path)

		const date = new Date()
		const endpoint = new Endpoint({
			id: endpointId,
			method: command.method,
			path: command.path,
			roles: command.roles,
			createdAt: date,
			updatedAt: date,
		})
		const cachedEndpoint = new CachedEndpoint({
			id: this._idGenerator.md5(`${endpoint.method}-${endpoint.path}`),
			method: endpoint.method,
			path: endpoint.path,
			roles: endpoint.roles,
			cachedAt: date,
		})

		await this._endpointRepository.save(endpoint)
		await this._cachedEndpointRepository.save(cachedEndpoint)

		return new CreateEndpointResponse({
			data: {
				id: endpoint.id,
				method: endpoint.method,
				path: endpoint.path,
				roles: endpoint.roles,
				createdAt: endpoint.createdAt.toISOString(),
				updatedAt: endpoint.updatedAt.toISOString(),
			},
			message: 'Endpoint creado exitosamente',
		})
	}

	private async _assertEndpointDoesNotExist(id: string, method: string, path: string) {
		const exists = await this._endpointRepository.findByIdMethodAndPath(id, method, path)
		if (exists) {
			throw new Error('El endpoint ya existe')
		}
	}
}
