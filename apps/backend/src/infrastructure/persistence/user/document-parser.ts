import { Timestamp } from 'firebase-admin/firestore'
import { Logger } from '@snowdrive/logger'
import { User } from '@princesitas/core'
import type { IUserDocument } from './types'

@Logger({ severity: 'TRACE' })
export class UserDocumentParser {
	public toDomain(document: IUserDocument): User {
		return new User({
			id: document.id,
			email: document.email,
			username: document.username,
			roles: document.roles,
			isSuperAdmin: document.isSuperAdmin,
			createdAt: document.createdAt.toDate(),
			updatedAt: document.updatedAt.toDate(),
		})
	}

	public toDocument(user: User): IUserDocument {
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			roles: user.roles,
			isSuperAdmin: user.isSuperAdmin,
			createdAt: Timestamp.fromDate(user.createdAt),
			updatedAt: Timestamp.fromDate(user.updatedAt),
		}
	}
}
