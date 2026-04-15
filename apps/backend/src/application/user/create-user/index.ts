import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { User } from '@princesitas/core'
import { CreateUserResponse } from './response'
import type { CreateUserCommand } from './command'

@Logger({ severity: 'INFO' })
export class CreateUser extends InjectableDependency(
	'idGenerator',
	'authService',
	'userRepository'
) {
	public async execute(command: CreateUserCommand) {
		const userId = this._idGenerator.generate()
		await this._assertUserDoesNotExist(userId, command.email)

		const date = new Date()
		const user = new User({
			id: userId,
			email: command.email,
			username: command.username,
			roles: command.roles,
			createdAt: date,
			updatedAt: date,
		})

		await Promise.all([
			this._authService.createUser({
				id: user.id,
				email: user.email,
				username: user.username,
				password: command.password,
			}),
			this._userRepository.save(user),
		])

		return new CreateUserResponse({
			data: {
				id: user.id,
				email: user.email,
				username: user.username,
				roles: user.roles,
				createdAt: user.createdAt.toISOString(),
				updatedAt: user.updatedAt.toISOString(),
			},
			message: 'Usuario creado exitosamente',
		})
	}

	private async _assertUserDoesNotExist(id: string, email: string) {
		const exists = await this._userRepository.findByIdOrEmail(id, email)
		if (exists) {
			throw new Error('El usuario ya existe')
		}
	}
}
