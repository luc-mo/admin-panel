import { Timestamp } from 'firebase-admin/firestore'
import { Logger } from '@snowdrive/logger'
import { Permission } from '@admin-panel/core'
import type { IPermissionDocument } from './types'

@Logger({ severity: 'TRACE' })
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
