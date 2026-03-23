import type { Timestamp } from 'firebase-admin/firestore'

export interface IEndpointDocument {
	id: string
	path: string
	permissions: string[][]
	createdAt: Timestamp
	updatedAt: Timestamp
}
