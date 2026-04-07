import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { Role, type IRoleCategory } from '@princesitas/core'
import { UpdateRoleResponse } from './response'
import type { UpdateRoleCommand } from './command'

@Logger({ severity: 'INFO' })
export class UpdateRole extends InjectableDependency('roleRepository') {
	public async execute(command: UpdateRoleCommand) {
		const exists = await this._roleRepository.findById(command.id)
		this._assertRoleExists(exists)
		this._assertRoleCategory(command.category)

		const updatedRole = new Role({
			id: exists.id,
			name: command.name ?? exists.name,
			description: command.description ?? exists.description,
			permissions: command.permissions ?? exists.permissions,
			category: command.category ?? exists.category,
			createdAt: exists.createdAt,
			updatedAt: new Date(),
		})

		await this._roleRepository.save(updatedRole)

		return new UpdateRoleResponse({
			data: updatedRole.toJSON(),
			message: 'Rol actualizado exitosamente',
		})
	}

	private _assertRoleExists(role: Role | null): asserts role is Role {
		if (!role) {
			throw new Error('Rol no encontrado')
		}
	}

	private _assertRoleCategory(category?: string): asserts category is IRoleCategory {
		const validCategories: IRoleCategory[] = ['ADMIN', 'EDITOR', 'READER', 'OTHER']
		if (category && !validCategories.includes(category as IRoleCategory)) {
			throw new Error(`La categoría del rol es inválida`)
		}
	}
}
