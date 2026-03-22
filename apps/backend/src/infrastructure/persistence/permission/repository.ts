import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import type { Permission } from '@princesitas/core'
import type { IPermissionDocument } from './types'

@Logger({ severity: 'DEBUG' })
export class PermissionRepository extends InjectableDependency(
	'dbHandler',
	'permissionDocumentParser'
) {
	public async findById(id: string) {
		const collection = this._getCollection()
		const document = await collection.doc(id).get()
		return document.exists ? this._permissionDocumentParser.toDomain(document.data()!) : null
	}

	public async save(permission: Permission) {
		const collection = this._getCollection()
		const document = this._permissionDocumentParser.toDocument(permission)
		await collection.doc(permission.id).set(document)
	}

	private _getCollection() {
		const COLLECTION_NAME = 'permissions'
		return this._dbHandler.getCollection<IPermissionDocument>(COLLECTION_NAME)
	}
}
