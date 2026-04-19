import { Logger } from '@snowdrive/logger'
import { CachedEndpoint } from '@/domain/cached-endpoint'
import type { ICachedEndpointDocument } from './types'

@Logger({ severity: 'TRACE' })
export class CachedEndpointDocumentParser {
	public toDomain(document: ICachedEndpointDocument): CachedEndpoint {
		return new CachedEndpoint({
			id: document.id,
			method: document.method,
			path: document.path,
			roles: document.roles,
			cachedAt: new Date(document.cachedAt),
		})
	}

	public toDocument(endpoint: CachedEndpoint): ICachedEndpointDocument {
		return {
			id: endpoint.id,
			method: endpoint.method,
			path: endpoint.path,
			roles: endpoint.roles,
			cachedAt: endpoint.cachedAt.getTime(),
		}
	}
}
