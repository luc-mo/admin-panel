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
			displayName: document.displayName,
			roles: document.roles,
			createdAt: document.createdAt.toDate(),
			updatedAt: document.updatedAt.toDate(),
		})
	}

	public toDocument(user: User): IUserDocument {
		return {
			id: user.id,
			email: user.email,
			username: user.username,
			displayName: user.displayName,
			roles: user.roles,
			createdAt: Timestamp.fromDate(user.createdAt),
			updatedAt: Timestamp.fromDate(user.updatedAt),
		}
	}
}
