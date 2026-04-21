import { createLogger, format, transports } from 'winston'
import { Logger } from '@snowdrive/logger'
import { config } from '@/infrastructure/config'

const { combine, timestamp, printf } = format

Logger.config({
	level: config.server.logLevel,
	logger: createLogger({
		level: 'trace',
		levels: {
			fatal: 0,
			error: 1,
			warn: 2,
			info: 3,
			debug: 4,
			trace: 5,
		},
		transports: [new transports.Console()],
		format: combine(
			timestamp(),
			printf(({ timestamp, level, message }) => {
				return `[${timestamp}] [${level.toUpperCase()}] ${message}`
			})
		),
	}),
	logEvents: { start: false },
})
