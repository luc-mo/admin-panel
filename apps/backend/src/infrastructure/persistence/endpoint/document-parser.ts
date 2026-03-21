import { Endpoint } from '@princesitas/core'
import type { IEndpointDocument } from './types'

export class EndpointDocumentParser {
	public toDomain(document: IEndpointDocument): Endpoint {
		return new Endpoint({
			id: document.id,
			path: document.path,
			permissions: document.permissions,
		})
	}

	public toDocument(endpoint: Endpoint): IEndpointDocument {
		return {
			id: endpoint.id,
			path: endpoint.path,
			permissions: endpoint.permissions,
		}
	}
}
