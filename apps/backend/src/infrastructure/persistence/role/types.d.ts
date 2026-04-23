import type { Timestamp } from 'firebase-admin/firestore'
import type { IRoleCategory } from '@admin-panel/core'

export interface IRoleDocument {
	id: string
	name: string
	description: string
	permissions: string[]
	category: IRoleCategory
	createdAt: Timestamp
	updatedAt: Timestamp
}
