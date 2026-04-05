import type { IUser } from '@/domain/user'
import type { IRole } from '@/domain/role'
import type { StrictOmit } from '@/shared/types/utils'

export interface IUserWithRoles extends StrictOmit<IUser, 'roles'> {
	roles: IRole[]
}
