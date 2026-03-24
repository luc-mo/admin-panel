import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { FindPermissionsResponse } from './response'
import type { FindPermissionsCommand } from './command'

@Logger({ severity: 'INFO' })
export class FindPermissions extends InjectableDependency('permissionRepository') {
	public async execute(command: FindPermissionsCommand) {
		const [permissions, total] = await Promise.all([
			this._permissionRepository.find(command.limit, command.offset),
			this._permissionRepository.count(),
		])

		const jsonPermissions = permissions.map((permission) => ({
			id: permission.id,
			key: permission.key,
			name: permission.name,
			createdAt: permission.createdAt.toISOString(),
			updatedAt: permission.updatedAt.toISOString(),
		}))
		return new FindPermissionsResponse({
			data: jsonPermissions,
			limit: command.limit,
			offset: command.offset,
			total,
		})
	}
}
