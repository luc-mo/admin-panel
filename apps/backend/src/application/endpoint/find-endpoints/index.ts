import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { FindEndpointsResponse } from './response'
import type { FindEndpointsCommand } from './command'

@Logger({ severity: 'INFO' })
export class FindEndpoints extends InjectableDependency('endpointRepository') {
	public async execute(command: FindEndpointsCommand) {
		const [endpoints, total] = await Promise.all([
			this._endpointRepository.find(command.limit, command.offset),
			this._endpointRepository.count(),
		])

		const jsonEndpoints = endpoints.map((endpoint) => ({
			id: endpoint.id,
			path: endpoint.path,
			permissions: endpoint.permissions,
			createdAt: endpoint.createdAt.toISOString(),
			updatedAt: endpoint.updatedAt.toISOString(),
		}))
		return new FindEndpointsResponse({
			data: jsonEndpoints,
			limit: command.limit,
			offset: command.offset,
			total,
		})
	}
}
