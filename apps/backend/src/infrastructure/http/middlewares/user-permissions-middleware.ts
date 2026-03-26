import { container } from '@/container'
import { CheckUserPermissionsCommand } from '@/application/auth/check-user-permissions/command'
import type { RequestHandler, Request, Response, NextFunction } from 'express'

const userPermissionsMiddleware: RequestHandler & { bypass: RequestHandler } = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req.context.bypassUserPermissions) {
			return next()
		}

		const command = new CheckUserPermissionsCommand({
			userId: req.authUser.uid,
			path: req.path,
		})
		const checkUserPermissions = container.resolve('checkUserPermissions')
		const response = await checkUserPermissions.execute(command)

		if (!response.hasPermission) {
			return res.status(403).send({ message: 'Forbidden' })
		}
		next()
	} catch {
		res.status(500).send({ message: 'Internal server error' })
	}
}

userPermissionsMiddleware.bypass = (req: Request, _res: Response, next: NextFunction) => {
	req.context.bypassUserPermissions = true
	next()
}

export { userPermissionsMiddleware }
