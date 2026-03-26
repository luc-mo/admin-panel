import type { LeveledLogMethod } from 'winston'
import type { DecodedIdToken } from 'firebase-admin/auth'

declare global {
	namespace Express {
		interface Request {
			rawBody: Buffer
			authUser: DecodedIdToken
		}
	}
}

declare module 'winston' {
	export interface Logger {
		fatal: LeveledLogMethod
		error: LeveledLogMethod
		warn: LeveledLogMethod
		info: LeveledLogMethod
		debug: LeveledLogMethod
		trace: LeveledLogMethod
	}
}
