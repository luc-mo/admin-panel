import { Filter } from 'firebase-admin/firestore'
import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import type { Role } from '@princesitas/core'
import type { IRoleDocument } from './types'

@Logger({ severity: 'DEBUG' })
export class RoleRepository extends InjectableDependency('dbHandler', 'roleDocumentParser') {
	public async count() {
		const collection = this._getCollection()
		const snapshot = await collection.count().get()
		return snapshot.data().count
	}

	public async find(limit: number, offset: number) {
		const collection = this._getCollection()
		const documents = await collection.limit(limit).offset(offset).get()
		return documents.docs.map((document) => this._roleDocumentParser.toDomain(document.data()))
	}

	public async findById(id: string) {
		const collection = this._getCollection()
		const document = await collection.doc(id).get()
		return document.exists ? this._roleDocumentParser.toDomain(document.data()!) : null
	}

	public async findByIdOrName(id: string, name: string) {
		const collection = this._getCollection()
		const query = Filter.or(Filter.where('id', '==', id), Filter.where('name', '==', name))
		const document = await collection.where(query).get()
		return document.docs[0] ? this._roleDocumentParser.toDomain(document.docs[0].data()) : null
	}

	public async save(role: Role) {
		const collection = this._getCollection()
		const document = this._roleDocumentParser.toDocument(role)
		await collection.doc(role.id).set(document)
	}

	public async remove(id: string) {
		const collection = this._getCollection()
		await collection.doc(id).delete()
	}

	private _getCollection() {
		const COLLECTION_NAME = 'roles'
		return this._dbHandler.getCollection<IRoleDocument>(COLLECTION_NAME)
	}
}
