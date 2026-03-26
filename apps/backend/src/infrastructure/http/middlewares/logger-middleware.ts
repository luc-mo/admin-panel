import { Logger } from '@snowdrive/logger'
import { IdGenerator } from '@/domain/services/id-generator'
import type { RequestHandler, Request, Response, NextFunction } from 'express'

export const loggerMiddleware: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const idGenerator = new IdGenerator()
	const traceId = (req.headers['x-trace-id'] as string) ?? (await idGenerator.generate())

	Logger.context.run(traceId, () => {
		res.setHeader('x-trace-id', traceId)
		Logger.info(`[Http] method=${req.method} path=${req.originalUrl} traceId=${traceId}`)
		next()
	})
}
