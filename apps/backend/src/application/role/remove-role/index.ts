import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { RemoveRoleResponse } from './response'
import type { RemoveRoleCommand } from './command'
import type { Role } from '@princesitas/core'

@Logger({ severity: 'INFO' })
export class RemoveRole extends InjectableDependency('roleRepository') {
	public async execute(command: RemoveRoleCommand) {
		const role = await this._roleRepository.findById(command.id)
		this._assertRoleExists(role)

		await this._roleRepository.remove(command.id)

		return new RemoveRoleResponse({
			data: role.toJSON(),
			message: 'Rol eliminado exitosamente',
		})
	}

	private _assertRoleExists(role: Role | null): asserts role is Role {
		if (!role) {
			throw new Error('Rol no encontrado')
		}
	}
}
