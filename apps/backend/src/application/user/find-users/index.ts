import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { FindUsersResponse } from './response'
import type { FindUsersCommand } from './command'

@Logger({ severity: 'INFO' })
export class FindUsers extends InjectableDependency('userRepository') {
	public async execute(command: FindUsersCommand) {
		const [users, total] = await Promise.all([
			this._userRepository.find(command.limit, command.offset),
			this._userRepository.count(),
		])

		const jsonUsers = users.map((user) => ({
			id: user.id,
			email: user.email,
			username: user.username,
			roles: user.roles,
			createdAt: user.createdAt.toISOString(),
			updatedAt: user.updatedAt.toISOString(),
		}))
		return new FindUsersResponse({
			data: jsonUsers,
			limit: command.limit,
			offset: command.offset,
			total,
		})
	}
}
