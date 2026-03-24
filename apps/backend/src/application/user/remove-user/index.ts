import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { RemoveUserResponse } from './response'
import type { RemoveUserCommand } from './command'
import type { User } from '@princesitas/core'

@Logger({ severity: 'INFO' })
export class RemoveUser extends InjectableDependency('userRepository', 'authService') {
	public async execute(command: RemoveUserCommand) {
		const user = await this._userRepository.findById(command.id)
		this._assertUserExists(user)

		await Promise.all([
			this._authService.removeUser(command.id),
			this._userRepository.remove(command.id),
		])

		return new RemoveUserResponse({
			data: {
				id: user.id,
				email: user.email,
				username: user.username,
				roles: user.roles,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
			},
			message: 'Usuario eliminado exitosamente',
		})
	}

	private _assertUserExists(user: User | null): asserts user is User {
		if (!user) {
			throw new Error('Usuario no encontrado')
		}
	}
}
