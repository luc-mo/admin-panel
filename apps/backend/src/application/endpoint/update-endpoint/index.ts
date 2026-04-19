import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { Endpoint } from '@princesitas/core'
import { UpdateEndpointResponse } from './response'
import type { UpdateEndpointCommand } from './command'

@Logger({ severity: 'INFO' })
export class UpdateEndpoint extends InjectableDependency('endpointRepository') {
	public async execute(command: UpdateEndpointCommand) {
		const exists = await this._endpointRepository.findById(command.id)
		this._assertEndpointExists(exists)
		await this._assertMethodAndPathDoNotExist(
			command.id,
			command.method ?? exists.method,
			command.path ?? exists.path
		)

		const updatedEndpoint = new Endpoint({
			id: exists.id,
			method: command.method ?? exists.method,
			path: command.path ?? exists.path,
			roles: command.roles ?? exists.roles,
			createdAt: exists.createdAt,
			updatedAt: new Date(),
		})

		await this._endpointRepository.save(updatedEndpoint)

		return new UpdateEndpointResponse({
			data: {
				id: updatedEndpoint.id,
				method: updatedEndpoint.method,
				path: updatedEndpoint.path,
				roles: updatedEndpoint.roles,
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

	private async _assertMethodAndPathDoNotExist(id: string, method: string, path: string) {
		const exists = await this._endpointRepository.findByMethodAndPath(method, path)
		if (exists && exists.id !== id) {
			throw new Error('El método y la ruta ya están en uso por otro endpoint')
		}
	}
}
