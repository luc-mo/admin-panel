import type { IRole } from '@/domain/role'
import type { IPermission } from '@/domain/permission'
import type { StrictOmit } from '@/shared/types/utils'

export interface IRoleWithPermissions extends StrictOmit<IRole, 'permissions'> {
	permissions: IPermission[]
}
