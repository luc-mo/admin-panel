import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { User } from '@princesitas/core'
import { UpdateUserResponse } from './response'
import type { UpdateUserCommand } from './command'

@Logger({ severity: 'INFO' })
export class UpdateUser extends InjectableDependency('userRepository') {
	public async execute(command: UpdateUserCommand) {
		const exists = await this._userRepository.findById(command.id)
		this._assertUserExists(exists)

		const updatedUser = new User({
			id: exists.id,
			email: exists.email,
			username: command.username ?? exists.username,
			roles: command.roles ?? exists.roles,
			isSuperAdmin: exists.isSuperAdmin,
			createdAt: exists.createdAt,
			updatedAt: new Date(),
		})

		await this._userRepository.save(updatedUser)

		return new UpdateUserResponse({
			data: {
				id: updatedUser.id,
				email: updatedUser.email,
				username: updatedUser.username,
				roles: updatedUser.roles,
				isSuperAdmin: updatedUser.isSuperAdmin,
				createdAt: updatedUser.createdAt.toISOString(),
				updatedAt: updatedUser.updatedAt.toISOString(),
			},
			message: 'Usuario actualizado exitosamente',
		})
	}

	private _assertUserExists(user: User | null): asserts user is User {
		if (!user) {
			throw new Error('Usuario no encontrado')
		}
	}
}
