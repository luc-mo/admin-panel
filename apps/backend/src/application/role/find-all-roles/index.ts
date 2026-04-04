import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'
import { FindAllRolesResponse } from './response'
import type { IJsonRole } from '@princesitas/core'

@Logger({ severity: 'INFO' })
export class FindAllRoles extends InjectableDependency('roleRepository') {
	public async execute() {
		const roles = await this._roleRepository.findAll()

		const jsonRoles: IJsonRole[] = roles.map((role) => ({
			id: role.id,
			name: role.name,
			description: role.description,
			permissions: role.permissions,
			createdAt: role.createdAt.toISOString(),
			updatedAt: role.updatedAt.toISOString(),
		}))

		return new FindAllRolesResponse({
			data: jsonRoles,
			total: jsonRoles.length,
		})
	}
}
