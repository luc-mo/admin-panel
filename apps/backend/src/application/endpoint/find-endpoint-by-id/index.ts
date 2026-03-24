import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { FindEndpointByIdResponse } from './response'
import type { FindEndpointByIdCommand } from './command'
import type { Endpoint } from '@princesitas/core'

@Logger({ severity: 'INFO' })
export class FindEndpointById extends InjectableDependency('endpointRepository') {
	public async execute(command: FindEndpointByIdCommand) {
		const endpoint = await this._endpointRepository.findById(command.id)
		this._assertEndpointExists(endpoint)

		return new FindEndpointByIdResponse({
			data: {
				id: endpoint.id,
				path: endpoint.path,
				permissions: endpoint.permissions,
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
