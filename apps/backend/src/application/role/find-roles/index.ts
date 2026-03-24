import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { FindRolesResponse } from './response'
import type { FindRolesCommand } from './command'

@Logger({ severity: 'INFO' })
export class FindRoles extends InjectableDependency('roleRepository') {
	public async execute(command: FindRolesCommand) {
		const [roles, total] = await Promise.all([
			this._roleRepository.find(command.limit, command.offset),
			this._roleRepository.count(),
		])

		const jsonRoles = roles.map((role) => ({
			id: role.id,
			name: role.name,
			description: role.description,
			permissions: role.permissions,
			createdAt: role.createdAt.toISOString(),
			updatedAt: role.updatedAt.toISOString(),
		}))
		return new FindRolesResponse({
			data: jsonRoles,
			limit: command.limit,
			offset: command.offset,
			total,
		})
	}
}
