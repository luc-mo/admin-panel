import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { CheckUserPermissionsResponse } from './response'
import type { User } from '@princesitas/core'
import type { CheckUserPermissionsCommand } from './command'

@Logger({ severity: 'INFO' })
export class CheckUserPermissions extends InjectableDependency(
	'userRepository',
	'roleRepository',
	'permissionRepository',
	'endpointRepository'
) {
	public async execute(command: CheckUserPermissionsCommand) {
		const [user, endpoint] = await Promise.all([
			this._userRepository.findById(command.userId),
			this._endpointRepository.findByPath(command.path),
		])
		this._assertUserExists(user)

		if (user.isSuperAdmin || !endpoint || !endpoint.roles.length) {
			return new CheckUserPermissionsResponse({ hasPermission: true })
		}

		const userRoles = new Set(user.roles)
		const hasPermission = endpoint.roles.some((roleId) => userRoles.has(roleId))
		return new CheckUserPermissionsResponse({ hasPermission })
	}

	private _assertUserExists(user: User | null): asserts user is User {
		if (!user) {
			throw new Error('El usuario no existe')
		}
	}
}
