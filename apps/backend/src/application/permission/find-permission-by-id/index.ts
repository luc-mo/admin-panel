import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { FindPermissionByIdResponse } from './response'
import type { FindPermissionByIdCommand } from './command'
import type { Permission } from '@princesitas/core'

@Logger({ severity: 'INFO' })
export class FindPermissionById extends InjectableDependency('permissionRepository') {
	public async execute(command: FindPermissionByIdCommand) {
		const permission = await this._permissionRepository.findById(command.id)
		this._assertPermissionExists(permission)

		return new FindPermissionByIdResponse({
			data: {
				id: permission.id,
				key: permission.key,
				name: permission.name,
				createdAt: permission.createdAt.toISOString(),
				updatedAt: permission.updatedAt.toISOString(),
			},
		})
	}

	private _assertPermissionExists(permission: Permission | null): asserts permission is Permission {
		if (!permission) {
			throw new Error('Permiso no encontrado')
		}
	}
}
