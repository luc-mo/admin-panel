import type { LeveledLogMethod } from 'winston'
import type { DecodedIdToken } from 'firebase-admin/auth'
import type { IContainer } from './container'

declare global {
	namespace Express {
		interface Request {
			rawBody: Buffer
			authUser: DecodedIdToken
			context: Record<string, any>
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

declare module '@snowdrive/utils' {
	export interface IDependencyMap extends IContainer {}
}