import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import type { Endpoint } from '@princesitas/core'
import type { IEndpointDocument } from './types'

@Logger({ severity: 'DEBUG' })
export class EndpointRepository extends InjectableDependency(
	'dbHandler',
	'endpointDocumentParser'
) {
	public async findById(id: string) {
		const collection = this._getCollection()
		const document = await collection.doc(id).get()
		return document.exists ? this._endpointDocumentParser.toDomain(document.data()!) : null
	}

	public async save(endpoint: Endpoint) {
		const collection = this._getCollection()
		const document = this._endpointDocumentParser.toDocument(endpoint)
		await collection.doc(endpoint.id).set(document)
	}

	private _getCollection() {
		const COLLECTION_NAME = 'endpoints'
		return this._dbHandler.getCollection<IEndpointDocument>(COLLECTION_NAME)
	}
}
