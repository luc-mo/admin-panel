import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { Endpoint } from '@princesitas/core'
import { CreateEndpointResponse } from './response'
import type { CreateEndpointCommand } from './command'

@Logger({ severity: 'INFO' })
export class CreateEndpoint extends InjectableDependency('idGenerator', 'endpointRepository') {
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

		await this._endpointRepository.save(endpoint)

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
