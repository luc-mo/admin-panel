import { Filter } from 'firebase-admin/firestore'
import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import type { User } from '@princesitas/core'
import type { IUserDocument } from './types'

@Logger({ severity: 'DEBUG' })
export class UserRepository extends InjectableDependency('dbHandler', 'userDocumentParser') {
	public async count() {
		const collection = this._getCollection()
		const snapshot = await collection.count().get()
		return snapshot.data().count
	}

	public async find(limit: number, offset: number) {
		const collection = this._getCollection()
		const documents = await collection.limit(limit).offset(offset).get()
		return documents.docs.map((document) => this._userDocumentParser.toDomain(document.data()))
	}

	public async findById(id: string) {
		const collection = this._getCollection()
		const document = await collection.doc(id).get()
		return document.exists ? this._userDocumentParser.toDomain(document.data()!) : null
	}

	public async findByIdOrEmail(id: string, email: string) {
		const collection = this._getCollection()
		const query = Filter.or(Filter.where('id', '==', id), Filter.where('email', '==', email))
		const document = await collection.where(query).get()
		return document.docs[0] ? this._userDocumentParser.toDomain(document.docs[0].data()) : null
	}

	public async save(user: User) {
		const collection = this._getCollection()
		const document = this._userDocumentParser.toDocument(user)
		await collection.doc(user.id).set(document)
	}

	public async remove(id: string) {
		const collection = this._getCollection()
		await collection.doc(id).delete()
	}

	private _getCollection() {
		const COLLECTION_NAME = 'users'
		return this._dbHandler.getCollection<IUserDocument>(COLLECTION_NAME)
	}
}
