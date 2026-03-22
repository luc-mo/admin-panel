import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import type { Role } from '@princesitas/core'
import type { IRoleDocument } from './types'

@Logger({ severity: 'DEBUG' })
export class RoleRepository extends InjectableDependency('dbHandler', 'roleDocumentParser') {
	public async findById(id: string) {
		const collection = this._getCollection()
		const document = await collection.doc(id).get()
		return document.exists ? this._roleDocumentParser.toDomain(document.data()!) : null
	}

	public async save(role: Role) {
		const collection = this._getCollection()
		const document = this._roleDocumentParser.toDocument(role)
		await collection.doc(role.id).set(document)
	}

	private _getCollection() {
		const COLLECTION_NAME = 'roles'
		return this._dbHandler.getCollection<IRoleDocument>(COLLECTION_NAME)
	}
}
