import type { LeveledLogMethod } from 'winston'

declare global {
	namespace Express {
		interface Request {
			rawBody: Buffer
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
