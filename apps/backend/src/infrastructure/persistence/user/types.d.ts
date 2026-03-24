import type { Timestamp } from 'firebase-admin/firestore'

export interface IUserDocument {
	id: string
	email: string
	username: string
	roles: string[]
	createdAt: Timestamp
	updatedAt: Timestamp
}
