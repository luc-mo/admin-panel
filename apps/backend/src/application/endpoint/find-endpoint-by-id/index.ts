import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { FindEndpointByIdResponse } from './response'
import type { FindEndpointByIdCommand } from './command'
import type { Endpoint } from '@admin-panel/core'

@Logger({ severity: 'INFO' })
export class FindEndpointById extends InjectableDependency('endpointRepository') {
	public async execute(command: FindEndpointByIdCommand) {
		const endpoint = await this._endpointRepository.findById(command.id)
		this._assertEndpointExists(endpoint)

		return new FindEndpointByIdResponse({
			data: {
				id: endpoint.id,
				method: endpoint.method,
				path: endpoint.path,
				roles: endpoint.roles,
				createdAt: endpoint.createdAt.toISOString(),
				updatedAt: endpoint.updatedAt.toISOString(),
			},
		})
	}

	private _assertEndpointExists(endpoint: Endpoint | null): asserts endpoint is Endpoint {
		if (!endpoint) {
			throw new Error('Endpoint no encontrado')
		}
	}
}
