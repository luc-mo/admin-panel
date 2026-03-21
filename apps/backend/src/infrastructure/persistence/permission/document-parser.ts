import { Timestamp } from 'firebase-admin/firestore'
import { Permission } from '@princesitas/core'
import type { IPermissionDocument } from './types'

export class PermissionDocumentParser {
	public toDomain(document: IPermissionDocument): Permission {
		return new Permission({
			id: document.id,
			key: document.key,
			name: document.name,
			createdAt: document.createdAt.toDate(),
			updatedAt: document.updatedAt.toDate(),
		})
	}

	public toDocument(permission: Permission): IPermissionDocument {
		return {
			id: permission.id,
			key: permission.key,
			name: permission.name,
			createdAt: Timestamp.fromDate(permission.createdAt),
			updatedAt: Timestamp.fromDate(permission.updatedAt),
		}
	}
}
