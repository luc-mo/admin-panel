import { container } from '@/container'
import { CheckUserRolesCommand } from '@/application/auth/check-user-roles/command'
import type { RequestHandler, Request, Response, NextFunction } from 'express'

const lastSlashReplacer = /\/$/

const userRolesMiddleware: RequestHandler & { bypass: RequestHandler } = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req.context.bypassUserPermissions) {
			return next()
		}

		const command = new CheckUserRolesCommand({
			userId: req.authUser.uid,
			method: req.method.toUpperCase(),
			path: `${req.baseUrl}${req.path}`.replace(lastSlashReplacer, ''),
		})
		const checkUserRoles = container.resolve('checkUserRoles')
		const response = await checkUserRoles.execute(command)

		if (!response.isAuthorized) {
			return res.status(403).send({ message: 'Forbidden' })
		}
		next()
	} catch {
		res.status(500).send({ message: 'Internal server error' })
	}
}

userRolesMiddleware.bypass = (req: Request, _res: Response, next: NextFunction) => {
	req.context.bypassUserPermissions = true
	next()
}

export { userRolesMiddleware }
