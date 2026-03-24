import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { Role } from '@princesitas/core'
import { UpdateRoleResponse } from './response'
import type { UpdateRoleCommand } from './command'

@Logger({ severity: 'INFO' })
export class UpdateRole extends InjectableDependency('roleRepository') {
	public async execute(command: UpdateRoleCommand) {
		const exists = await this._roleRepository.findById(command.id)
		this._assertRoleExists(exists)

		const updatedRole = new Role({
			id: exists.id,
			name: command.name ?? exists.name,
			description: command.description ?? exists.description,
			permissions: command.permissions ?? exists.permissions,
			createdAt: exists.createdAt,
			updatedAt: new Date(),
		})

		await this._roleRepository.save(updatedRole)

		return new UpdateRoleResponse({
			data: {
				id: updatedRole.id,
				name: updatedRole.name,
				description: updatedRole.description,
				permissions: updatedRole.permissions,
				createdAt: updatedRole.createdAt.toISOString(),
				updatedAt: updatedRole.updatedAt.toISOString(),
			},
			message: 'Rol actualizado exitosamente',
		})
	}

	private _assertRoleExists(role: Role | null): asserts role is Role {
		if (!role) {
			throw new Error('Rol no encontrado')
		}
	}
}
