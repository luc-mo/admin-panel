import { container } from '@/container'
import type { RequestHandler, Request, Response, NextFunction } from 'express'

export const accessTokenMiddleware: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers
	if (!authorization) {
		return res.status(401).send({ message: 'Missing authorization header' })
	}

	const [bearer, token] = authorization.split(' ')

	if (bearer!.toLowerCase() !== 'bearer') {
		return res.status(401).send({ message: 'Invalid token type' })
	}

	if (!token) {
		return res.status(401).send({ message: 'Bearer token not present' })
	}

	try {
		const authService = container.resolve('authService')
		const authUser = await authService.validateToken(token)
		req.authUser = authUser
		next()
	} catch {
		res.status(401).send({ message: 'Invalid access token' })
	}
}
