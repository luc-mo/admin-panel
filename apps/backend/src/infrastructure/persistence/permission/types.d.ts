import type { Timestamp } from 'firebase-admin/firestore'

export interface IPermissionDocument {
	id: string
	key: string
	name: string
	createdAt: Timestamp
	updatedAt: Timestamp
}
