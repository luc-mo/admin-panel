import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'
import { FindAllRolesResponse } from './response'

@Logger({ severity: 'INFO' })
export class FindAllRoles extends InjectableDependency('roleRepository') {
	public async execute() {
		const roles = await this._roleRepository.findAll()

		return new FindAllRolesResponse({
			data: roles.map((role) => role.toJSON()),
			total: roles.length,
		})
	}
}
