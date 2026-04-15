import type { Request, Response, NextFunction } from 'express'
import type { IMiddlewareConfig } from '@snowdrive/utils'

export const contextMiddleware: IMiddlewareConfig = {
	overrideable: false,
	handler: (req: Request, _res: Response, next: NextFunction) => {
		req.context = {}
		next()
	},
}
