import type { Timestamp } from 'firebase-admin/firestore'

export interface IRoleDocument {
	id: string
	name: string
	description: string
	permissions: string[]
	createdAt: Timestamp
	updatedAt: Timestamp
}
