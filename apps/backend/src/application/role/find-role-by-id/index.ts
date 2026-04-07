import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { FindRoleByIdResponse } from './response'
import type { FindRoleByIdCommand } from './command'
import type { Role } from '@princesitas/core'

@Logger({ severity: 'INFO' })
export class FindRoleById extends InjectableDependency('roleRepository') {
	public async execute(command: FindRoleByIdCommand) {
		const role = await this._roleRepository.findById(command.id)
		this._assertRoleExists(role)

		return new FindRoleByIdResponse({ data: role.toJSON() })
	}

	private _assertRoleExists(role: Role | null): asserts role is Role {
		if (!role) {
			throw new Error('Rol no encontrado')
		}
	}
}
