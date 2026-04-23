import { Filter } from 'firebase-admin/firestore'
import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import type { Endpoint } from '@admin-panel/core'
import type { IEndpointDocument } from './types'

@Logger({ severity: 'DEBUG' })
export class EndpointRepository extends InjectableDependency(
	'dbHandler',
	'endpointDocumentParser'
) {
	public async count() {
		const collection = this._getCollection()
		const snapshot = await collection.count().get()
		return snapshot.data().count
	}

	public async findAll() {
		const collection = this._getCollection()
		const documents = await collection.get()
		return documents.docs.map((document) => this._endpointDocumentParser.toDomain(document.data()))
	}

	public async find(limit: number, offset: number) {
		const collection = this._getCollection()
		const documents = await collection.limit(limit).offset(offset).get()
		return documents.docs.map((document) => this._endpointDocumentParser.toDomain(document.data()))
	}

	public async findById(id: string) {
		const collection = this._getCollection()
		const document = await collection.doc(id).get()
		return document.exists ? this._endpointDocumentParser.toDomain(document.data()!) : null
	}

	public async findByIdMethodAndPath(id: string, method: string, path: string) {
		const collection = this._getCollection()
		const query = Filter.or(
			Filter.where('id', '==', id),
			Filter.and(Filter.where('method', '==', method), Filter.where('path', '==', path))
		)
		const document = await collection.where(query).get()
		return document.docs[0] ? this._endpointDocumentParser.toDomain(document.docs[0].data()) : null
	}

	public async findByMethodAndPath(method: string, path: string) {
		const collection = this._getCollection()
		const query = Filter.and(Filter.where('method', '==', method), Filter.where('path', '==', path))
		const document = await collection.where(query).get()
		return document.docs[0] ? this._endpointDocumentParser.toDomain(document.docs[0].data()) : null
	}

	public async save(endpoint: Endpoint) {
		const collection = this._getCollection()
		const document = this._endpointDocumentParser.toDocument(endpoint)
		await collection.doc(endpoint.id).set(document)
	}

	public async remove(id: string) {
		const collection = this._getCollection()
		await collection.doc(id).delete()
	}

	private _getCollection() {
		const COLLECTION_NAME = 'endpoints'
		return this._dbHandler.getCollection<IEndpointDocument>(COLLECTION_NAME)
	}
}
