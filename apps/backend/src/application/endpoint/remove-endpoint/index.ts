import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { RemoveEndpointResponse } from './response'
import type { RemoveEndpointCommand } from './command'
import type { Endpoint } from '@princesitas/core'

@Logger({ severity: 'INFO' })
export class RemoveEndpoint extends InjectableDependency('endpointRepository') {
	public async execute(command: RemoveEndpointCommand) {
		const endpoint = await this._endpointRepository.findById(command.id)
		this._assertEndpointExists(endpoint)

		await this._endpointRepository.remove(command.id)

		return new RemoveEndpointResponse({
			data: {
				id: endpoint.id,
				path: endpoint.path,
				roles: endpoint.roles,
				createdAt: endpoint.createdAt.toISOString(),
				updatedAt: endpoint.updatedAt.toISOString(),
			},
			message: 'Endpoint eliminado exitosamente',
		})
	}

	private _assertEndpointExists(endpoint: Endpoint | null): asserts endpoint is Endpoint {
		if (!endpoint) {
			throw new Error('Endpoint no encontrado')
		}
	}
}
