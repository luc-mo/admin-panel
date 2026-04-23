import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { Permission } from '@admin-panel/core'
import { UpdatePermissionResponse } from './response'
import type { UpdatePermissionCommand } from './command'

@Logger({ severity: 'INFO' })
export class UpdatePermission extends InjectableDependency('permissionRepository') {
	public async execute(command: UpdatePermissionCommand) {
		const exists = await this._permissionRepository.findById(command.id)
		this._assertPermissionExists(exists)

		const updatedPermission = new Permission({
			id: exists.id,
			key: command.key ?? exists.key,
			name: command.name ?? exists.name,
			createdAt: exists.createdAt,
			updatedAt: new Date(),
		})

		await this._permissionRepository.save(updatedPermission)

		return new UpdatePermissionResponse({
			data: {
				id: updatedPermission.id,
				key: updatedPermission.key,
				name: updatedPermission.name,
				createdAt: updatedPermission.createdAt.toISOString(),
				updatedAt: updatedPermission.updatedAt.toISOString(),
			},
			message: 'Permiso actualizado exitosamente',
		})
	}

	private _assertPermissionExists(permission: Permission | null): asserts permission is Permission {
		if (!permission) {
			throw new Error('Permiso no encontrado')
		}
	}
}
