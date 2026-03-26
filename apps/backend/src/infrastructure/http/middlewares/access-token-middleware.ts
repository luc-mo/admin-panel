import { container } from '@/container'
import type { Request, Response, NextFunction } from 'express'

export const accessTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers
	if (!authorization) {
		res.status(401).send({ message: 'Missing authorization header' })
		return
	}

	const [bearer, token] = authorization.split(' ')

	if (bearer!.toLowerCase() !== 'bearer') {
		res.status(401).send({ message: 'Invalid token type' })
		return
	}

	if (!token) {
		res.status(401).send({ message: 'Bearer token not present' })
		return
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
