import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { Endpoint } from '@princesitas/core'
import { CreateEndpointResponse } from './response'
import type { CreateEndpointCommand } from './command'

@Logger({ severity: 'INFO' })
export class CreateEndpoint extends InjectableDependency('idGenerator', 'endpointRepository') {
	public async execute(command: CreateEndpointCommand) {
		const endpointId = this._idGenerator.generate()
		await this._assertEndpointDoesNotExist(endpointId, command.path)

		const date = new Date()
		const endpoint = new Endpoint({
			id: endpointId,
			path: command.path,
			roles: command.roles,
			createdAt: date,
			updatedAt: date,
		})

		await this._endpointRepository.save(endpoint)

		return new CreateEndpointResponse({
			data: {
				id: endpoint.id,
				path: endpoint.path,
				roles: endpoint.roles,
				createdAt: endpoint.createdAt.toISOString(),
				updatedAt: endpoint.updatedAt.toISOString(),
			},
			message: 'Endpoint creado exitosamente',
		})
	}

	private async _assertEndpointDoesNotExist(id: string, path: string) {
		const exists = await this._endpointRepository.findByIdOrPath(id, path)
		if (exists) {
			throw new Error('El endpoint ya existe')
		}
	}
}
