import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { User } from '@princesitas/core'
import { CreateUserResponse } from './response'
import type { CreateUserCommand } from './command'

@Logger({ severity: 'INFO' })
export class CreateUser extends InjectableDependency('authService', 'userRepository') {
	public async execute(command: CreateUserCommand) {
		await this._assertUserDoesNotExist(command.id, command.email)

		const date = new Date()
		const user = new User({
			id: command.id,
			email: command.email,
			username: command.username,
			displayName: command.displayName,
			roles: [],
			createdAt: date,
			updatedAt: date,
		})

		await this._authService.createUser({
			id: user.id,
			email: user.email,
			password: command.password,
			displayName: user.displayName,
		})
		await this._userRepository.save(user)

		return new CreateUserResponse({
			data: {
				id: user.id,
				email: user.email,
				username: user.username,
				displayName: user.displayName,
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
