import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { User } from '@princesitas/core'
import { CreateUserResponse } from './response'
import type { CreateUserCommand } from './command'

@Logger({ severity: 'INFO' })
export class CreateUser extends InjectableDependency('authService', 'userRepository') {
	public async execute(command: CreateUserCommand) {
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
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
			message: 'Usuario creado exitosamente',
		})
	}
}
