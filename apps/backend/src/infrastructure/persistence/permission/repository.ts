import { Filter } from 'firebase-admin/firestore'
import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import type { Permission } from '@princesitas/core'
import type { IPermissionDocument } from './types'

@Logger({ severity: 'DEBUG' })
export class PermissionRepository extends InjectableDependency(
	'dbHandler',
	'permissionDocumentParser'
) {
	public async count() {
		const collection = this._getCollection()
		const snapshot = await collection.count().get()
		return snapshot.data().count
	}

	public async find(limit: number, offset: number) {
		const collection = this._getCollection()
		const documents = await collection.limit(limit).offset(offset).get()
		return documents.docs.map((document) =>
			this._permissionDocumentParser.toDomain(document.data())
		)
	}

	public async findById(id: string) {
		const collection = this._getCollection()
		const document = await collection.doc(id).get()
		return document.exists ? this._permissionDocumentParser.toDomain(document.data()!) : null
	}

	public async findByIdOrKey(id: string, key: string) {
		const collection = this._getCollection()
		const query = Filter.or(Filter.where('id', '==', id), Filter.where('key', '==', key))
		const document = await collection.where(query).get()
		return document.docs[0]
			? this._permissionDocumentParser.toDomain(document.docs[0].data())
			: null
	}

	public async save(permission: Permission) {
		const collection = this._getCollection()
		const document = this._permissionDocumentParser.toDocument(permission)
		await collection.doc(permission.id).set(document)
	}

	public async remove(id: string) {
		const collection = this._getCollection()
		await collection.doc(id).delete()
	}

	private _getCollection() {
		const COLLECTION_NAME = 'permissions'
		return this._dbHandler.getCollection<IPermissionDocument>(COLLECTION_NAME)
	}
}
