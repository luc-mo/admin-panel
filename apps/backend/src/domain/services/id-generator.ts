import crypto from 'node:crypto'

export class IdGenerator {
	public uuid(): string {
		return crypto.randomUUID()
	}
}
