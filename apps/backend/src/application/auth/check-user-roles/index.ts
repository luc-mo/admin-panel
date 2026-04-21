import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { CheckUserRolesResponse } from './response'
import type { User } from '@princesitas/core'
import type { CheckUserRolesCommand } from './command'

@Logger({ severity: 'INFO' })
export class CheckUserRoles extends InjectableDependency(
	'idGenerator',
	'endpointParser',
	'userRepository',
	'cachedEndpointRepository'
) {
	public async execute(command: CheckUserRolesCommand) {
		const registeredPath = this._endpointParser.parse(command.path, [
			'/users',
			'/users/me',
			'/users/:id',
			'/roles',
			'/roles/all',
			'/roles/:id',
			'/permissions',
			'/permissions/all',
			'/permissions/:id',
			'/endpoints',
			'/endpoints/:id',
		])

		if (!registeredPath) {
			return new CheckUserRolesResponse({ isAuthorized: true })
		}

		const cachedEndpointId = this._idGenerator.md5(`${command.method}-${registeredPath}`)
		const cachedEndpoint = await this._cachedEndpointRepository.findById(cachedEndpointId)

		if (!cachedEndpoint) {
			return new CheckUserRolesResponse({ isAuthorized: true })
		}

		const user = await this._userRepository.findById(command.userId)
		this._assertUserExists(user)

		if (user.isSuperAdmin) {
			return new CheckUserRolesResponse({ isAuthorized: true })
		}

		const userRoles = new Set(user.roles)
		const isAuthorized = cachedEndpoint.roles.some((roleId) => userRoles.has(roleId))
		return new CheckUserRolesResponse({ isAuthorized })
	}

	private _assertUserExists(user: User | null): asserts user is User {
		if (!user) {
			throw new Error('El usuario no existe')
		}
	}
}
