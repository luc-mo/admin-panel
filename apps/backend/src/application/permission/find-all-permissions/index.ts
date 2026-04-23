import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { FindAllPermissionsResponse } from './response'
import type { IJsonPermission } from '@admin-panel/core'

@Logger({ severity: 'INFO' })
export class FindAllPermissions extends InjectableDependency('permissionRepository') {
	public async execute() {
		const permissions = await this._permissionRepository.findAll()

		const jsonPermissions: IJsonPermission[] = permissions.map((permission) => ({
			id: permission.id,
			key: permission.key,
			name: permission.name,
			createdAt: permission.createdAt.toISOString(),
			updatedAt: permission.updatedAt.toISOString(),
		}))

		return new FindAllPermissionsResponse({
			data: jsonPermissions,
			total: jsonPermissions.length,
		})
	}
}
