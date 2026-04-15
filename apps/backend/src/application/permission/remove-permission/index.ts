import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { RemovePermissionResponse } from './response'
import type { RemovePermissionCommand } from './command'
import type { Permission } from '@princesitas/core'

@Logger({ severity: 'INFO' })
export class RemovePermission extends InjectableDependency('permissionRepository') {
	public async execute(command: RemovePermissionCommand) {
		const permission = await this._permissionRepository.findById(command.id)
		this._assertPermissionExists(permission)

		await this._permissionRepository.remove(command.id)

		return new RemovePermissionResponse({
			data: {
				id: permission.id,
				key: permission.key,
				name: permission.name,
				createdAt: permission.createdAt.toISOString(),
				updatedAt: permission.updatedAt.toISOString(),
			},
			message: 'Permiso eliminado exitosamente',
		})
	}

	private _assertPermissionExists(permission: Permission | null): asserts permission is Permission {
		if (!permission) {
			throw new Error('Permiso no encontrado')
		}
	}
}
