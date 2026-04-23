import { Timestamp } from 'firebase-admin/firestore'
import { Logger } from '@snowdrive/logger'
import { Role } from '@admin-panel/core'
import type { IRoleDocument } from './types'

@Logger({ severity: 'TRACE' })
export class RoleDocumentParser {
	public toDomain(document: IRoleDocument): Role {
		return new Role({
			id: document.id,
			name: document.name,
			description: document.description,
			permissions: document.permissions,
			category: document.category,
			createdAt: document.createdAt.toDate(),
			updatedAt: document.updatedAt.toDate(),
		})
	}

	public toDocument(role: Role): IRoleDocument {
		return {
			id: role.id,
			name: role.name,
			description: role.description,
			permissions: role.permissions,
			category: role.category,
			createdAt: Timestamp.fromDate(role.createdAt),
			updatedAt: Timestamp.fromDate(role.updatedAt),
		}
	}
}
