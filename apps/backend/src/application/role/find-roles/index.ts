import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { FindRolesResponse } from './response'
import type { FindRolesCommand } from './command'

@Logger({ severity: 'INFO' })
export class FindRoles extends InjectableDependency('roleRepository') {
	public async execute(command: FindRolesCommand) {
		const [roles, total] = await Promise.all([
			this._roleRepository.find(command.limit, command.offset),
			this._roleRepository.count(),
		])

		return new FindRolesResponse({
			data: roles.map((role) => role.toJSON()),
			limit: command.limit,
			offset: command.offset,
			total,
		})
	}
}
