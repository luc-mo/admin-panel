import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { Role, type IRoleCategory } from '@princesitas/core'
import { CreateRoleResponse } from './response'
import type { CreateRoleCommand } from './command'

@Logger({ severity: 'INFO' })
export class CreateRole extends InjectableDependency('idGenerator', 'roleRepository') {
	public async execute(command: CreateRoleCommand) {
		const roleId = this._idGenerator.generate()
		const exists = await this._roleRepository.findByIdOrName(roleId, command.name)

		this._assertRoleDoesNotExist(exists)
		this._assertRoleCategory(command.category)

		const date = new Date()
		const role = new Role({
			id: roleId,
			name: command.name,
			description: command.description,
			permissions: command.permissions,
			category: command.category,
			createdAt: date,
			updatedAt: date,
		})

		await this._roleRepository.save(role)

		return new CreateRoleResponse({
			data: role.toJSON(),
			message: 'Rol creado exitosamente',
		})
	}

	private _assertRoleDoesNotExist(role: Role | null) {
		if (role) {
			throw new Error('El rol ya existe')
		}
	}

	private _assertRoleCategory(category: string): asserts category is IRoleCategory {
		const validCategories: IRoleCategory[] = ['ADMIN', 'EDITOR', 'READER', 'OTHER']
		if (!validCategories.includes(category as IRoleCategory)) {
			throw new Error(`La categoría del rol es inválida`)
		}
	}
}
