import type { IEndpoint } from '@/domain/endpoint'
import type { IRole } from '@/domain/role'
import type { StrictOmit } from '@/shared/types/utils'

export interface IEndpointWithRoles extends StrictOmit<IEndpoint, 'roles'> {
	roles: IRole[]
}
