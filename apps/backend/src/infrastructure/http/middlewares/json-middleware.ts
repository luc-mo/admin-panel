import express, { type Request } from 'express'
import type { IMiddlewareConfig } from '@snowdrive/utils'

export const jsonMiddleware: IMiddlewareConfig = {
	overrideable: false,
	handler: express.json({
		verify: (req: Request, _, buf) => {
			req.rawBody = buf
		},
	}),
}
