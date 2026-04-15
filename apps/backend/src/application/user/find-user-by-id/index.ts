import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { FindUserByIdResponse } from './response'
import type { FindUserByIdCommand } from './command'
import type { User } from '@princesitas/core'

@Logger({ severity: 'INFO' })
export class FindUserById extends InjectableDependency('userRepository') {
	public async execute(command: FindUserByIdCommand) {
		const user = await this._userRepository.findById(command.id)
		this._assertUserExists(user)

		return new FindUserByIdResponse({
			data: {
				id: user.id,
				email: user.email,
				username: user.username,
				roles: user.roles,
				isSuperAdmin: user.isSuperAdmin,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
			},
		})
	}

	private _assertUserExists(user: User | null): asserts user is User {
		if (!user) {
			throw new Error('Usuario no encontrado')
		}
	}
}
