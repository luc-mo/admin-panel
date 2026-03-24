import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { Role } from '@princesitas/core'
import { CreateRoleResponse } from './response'
import type { CreateRoleCommand } from './command'

@Logger({ severity: 'INFO' })
export class CreateRole extends InjectableDependency('idGenerator', 'roleRepository') {
	public async execute(command: CreateRoleCommand) {
		const roleId = this._idGenerator.generate()
		await this._assertRoleDoesNotExist(roleId, command.name)

		const date = new Date()
		const role = new Role({
			id: roleId,
			name: command.name,
			description: command.description,
			permissions: command.permissions,
			createdAt: date,
			updatedAt: date,
		})

		await this._roleRepository.save(role)

		return new CreateRoleResponse({
			data: {
				id: role.id,
				name: role.name,
				description: role.description,
				permissions: role.permissions,
				createdAt: role.createdAt.toISOString(),
				updatedAt: role.updatedAt.toISOString(),
			},
			message: 'Rol creado exitosamente',
		})
	}

	private async _assertRoleDoesNotExist(id: string, name: string) {
		const exists = await this._roleRepository.findByIdOrName(id, name)
		if (exists) {
			throw new Error('El rol ya existe')
		}
	}
}
