import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { CachedEndpoint } from '@/domain/cached-endpoint'
import type { Endpoint } from '@admin-panel/core'

@Logger({ severity: 'INFO' })
export class CacheEndpoints extends InjectableDependency(
	'idGenerator',
	'endpointRepository',
	'cachedEndpointRepository'
) {
	public async execute() {
		const endpoints = await this._endpointRepository.findAll()

		const date = new Date()
		const cachedEndpoints = endpoints.map((endpoint) => {
			return new CachedEndpoint({
				id: this._generateCacheId(endpoint),
				method: endpoint.method,
				path: endpoint.path,
				roles: endpoint.roles,
				cachedAt: date,
			})
		})

		await this._cachedEndpointRepository.removeAll()
		await this._cachedEndpointRepository.saveBulk(cachedEndpoints)
	}

	private _generateCacheId(endpoint: Endpoint) {
		return this._idGenerator.md5(`${endpoint.method}-${endpoint.path}`)
	}
}
