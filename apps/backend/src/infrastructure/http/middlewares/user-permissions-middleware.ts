import { container } from '@/container'
import { CheckUserPermissionsCommand } from '@/application/auth/check-user-permissions/command'
import type { Request, Response, NextFunction } from 'express'

export const userPermissionsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const command = new CheckUserPermissionsCommand({
			userId: req.authUser.uid,
			path: req.path,
		})
		const checkUserPermissions = container.resolve('checkUserPermissions')
		const response = await checkUserPermissions.execute(command)

		if (!response.hasPermission) {
			res.status(403).send({ message: 'Forbidden' })
			return
		}
		next()
	} catch {
		res.status(500).send({ message: 'Internal server error' })
	}
}
