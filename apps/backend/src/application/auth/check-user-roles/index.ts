import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { CheckUserRolesResponse } from './response'
import type { User } from '@princesitas/core'
import type { CheckUserRolesCommand } from './command'

@Logger({ severity: 'INFO' })
export class CheckUserRoles extends InjectableDependency(
	'userRepository',
	'roleRepository',
	'permissionRepository',
	'endpointRepository'
) {
	public async execute(command: CheckUserRolesCommand) {
		const [user, endpoint] = await Promise.all([
			this._userRepository.findById(command.userId),
			this._endpointRepository.findByPath(command.path),
		])
		this._assertUserExists(user)

		if (user.isSuperAdmin || !endpoint || !endpoint.roles.length) {
			return new CheckUserRolesResponse({ isAuthorized: true })
		}

		const userRoles = new Set(user.roles)
		const isAuthorized = endpoint.roles.some((roleId) => userRoles.has(roleId))
		return new CheckUserRolesResponse({ isAuthorized })
	}

	private _assertUserExists(user: User | null): asserts user is User {
		if (!user) {
			throw new Error('El usuario no existe')
		}
	}
}
