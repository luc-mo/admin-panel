import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { Permission } from '@princesitas/core'
import { CreatePermissionResponse } from './response'
import type { CreatePermissionCommand } from './command'

@Logger({ severity: 'INFO' })
export class CreatePermission extends InjectableDependency('idGenerator', 'permissionRepository') {
	public async execute(command: CreatePermissionCommand) {
		const permissionId = this._idGenerator.uuid()
		await this._assertPermissionDoesNotExist(permissionId, command.key)

		const date = new Date()
		const permission = new Permission({
			id: permissionId,
			key: command.key,
			name: command.name,
			createdAt: date,
			updatedAt: date,
		})

		await this._permissionRepository.save(permission)

		return new CreatePermissionResponse({
			data: {
				id: permission.id,
				key: permission.key,
				name: permission.name,
				createdAt: permission.createdAt.toISOString(),
				updatedAt: permission.updatedAt.toISOString(),
			},
			message: 'Permiso creado exitosamente',
		})
	}

	private async _assertPermissionDoesNotExist(id: string, key: string) {
		const exists = await this._permissionRepository.findByIdOrKey(id, key)
		if (exists) {
			throw new Error('El permiso ya existe')
		}
	}
}
