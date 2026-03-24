import { Timestamp } from 'firebase-admin/firestore'
import { Logger } from '@snowdrive/logger'
import { Endpoint } from '@princesitas/core'
import type { IEndpointDocument } from './types'

@Logger({ severity: 'TRACE' })
export class EndpointDocumentParser {
	public toDomain(document: IEndpointDocument): Endpoint {
		return new Endpoint({
			id: document.id,
			path: document.path,
			roles: document.roles,
			createdAt: document.createdAt.toDate(),
			updatedAt: document.updatedAt.toDate(),
		})
	}

	public toDocument(endpoint: Endpoint): IEndpointDocument {
		return {
			id: endpoint.id,
			path: endpoint.path,
			roles: endpoint.roles,
			createdAt: Timestamp.fromDate(endpoint.createdAt),
			updatedAt: Timestamp.fromDate(endpoint.updatedAt),
		}
	}
}
