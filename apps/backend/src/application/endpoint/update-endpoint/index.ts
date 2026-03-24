import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { Endpoint } from '@princesitas/core'
import { UpdateEndpointResponse } from './response'
import type { UpdateEndpointCommand } from './command'

@Logger({ severity: 'INFO' })
export class UpdateEndpoint extends InjectableDependency('endpointRepository') {
	public async execute(command: UpdateEndpointCommand) {
		const exists = await this._endpointRepository.findById(command.id)
		this._assertEndpointExists(exists)

		const updatedEndpoint = new Endpoint({
			id: exists.id,
			path: command.path ?? exists.path,
			permissions: command.permissions ?? exists.permissions,
			createdAt: exists.createdAt,
			updatedAt: new Date(),
		})

		await this._endpointRepository.save(updatedEndpoint)

		return new UpdateEndpointResponse({
			data: {
				id: updatedEndpoint.id,
				path: updatedEndpoint.path,
				permissions: updatedEndpoint.permissions,
				createdAt: updatedEndpoint.createdAt.toISOString(),
				updatedAt: updatedEndpoint.updatedAt.toISOString(),
			},
			message: 'Endpoint actualizado exitosamente',
		})
	}

	private _assertEndpointExists(endpoint: Endpoint | null): asserts endpoint is Endpoint {
		if (!endpoint) {
			throw new Error('Endpoint no encontrado')
		}
	}
}
