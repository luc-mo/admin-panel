import crypto from 'node:crypto'

export class IdGenerator {
	public generate(): string {
		return crypto.randomUUID()
	}
}
