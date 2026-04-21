import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import type { CachedEndpoint } from '@/domain/cached-endpoint'
import type { ICachedEndpointDocument } from './types'

@Logger({ severity: 'DEBUG' })
export class CachedEndpointRepository extends InjectableDependency(
	'cacheHandler',
	'cachedEndpointDocumentParser'
) {
	private readonly _COLLECTION = 'cached-endpoints'

	public async findById(id: string) {
		const instance = this._cacheHandler.getInstance()
		const snapshot = await instance.ref(`${this._COLLECTION}/${id}`).once('value')
		return snapshot.exists() ? this._cachedEndpointDocumentParser.toDomain(snapshot.val()) : null
	}

	public async save(endpoint: CachedEndpoint) {
		const instance = this._cacheHandler.getInstance()
		const document = this._cachedEndpointDocumentParser.toDocument(endpoint)
		await instance.ref(`${this._COLLECTION}/${endpoint.id}`).set(document)
	}

	public async saveBulk(endpoints: CachedEndpoint[]) {
		const instance = this._cacheHandler.getInstance()
		const documents: Record<string, ICachedEndpointDocument> = {}
		for (const endpoint of endpoints) {
			const document = this._cachedEndpointDocumentParser.toDocument(endpoint)
			documents[`${this._COLLECTION}/${endpoint.id}`] = document
		}
		await instance.ref('/').update(documents)
	}

	public async remove(id: string) {
		const instance = this._cacheHandler.getInstance()
		await instance.ref(`${this._COLLECTION}/${id}`).remove()
	}

	public async removeAll() {
		const instance = this._cacheHandler.getInstance()
		await instance.ref(this._COLLECTION).remove()
	}
}
