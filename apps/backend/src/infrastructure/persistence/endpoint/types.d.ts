import type { Timestamp } from 'firebase-admin/firestore'

export interface IEndpointDocument {
	id: string
	method: string
	path: string
	roles: string[]
	createdAt: Timestamp
	updatedAt: Timestamp
}
