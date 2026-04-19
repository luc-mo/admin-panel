import crypto from 'node:crypto'

export class IdGenerator {
	public uuid(): string {
		return crypto.randomUUID()
	}

	public md5(input: string): string {
		return crypto.createHash('md5').update(input).digest('hex')
	}
}
