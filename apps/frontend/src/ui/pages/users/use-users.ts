import { useMemo, useEffect } from 'react'
import type { TablePaginationConfig } from 'antd'

import { usePopUp } from '@/shared/hooks/use-pop-up'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'
import { allRolesProvider } from '@/ui/providers/roles-provider'

import { useFindUsers } from '@/application/user/use-find-users'
import { useRemoveUser } from '@/application/user/use-remove-user'
import type { IUserWithRoles } from '@princesitas/core'

export const useUsers = () => {
	const { allRoles, ...providers } = useProviders([
		allRolesProvider,
		coreServicesProvider,
		toastProvider,
	])
	const findUsers = useFindUsers(providers)
	const removeUser = useRemoveUser(providers)
	const removeUserPopUp = usePopUp()

	const usersWithRoles: IUserWithRoles[] = useMemo(() => {
		return findUsers.data.map((user) => {
			const roles = user.roles.map((roleId) => allRoles.dataMap.get(roleId)!)
			return { ...user, roles }
		})
	}, [findUsers.data, allRoles.dataMap])

	const loadings = useMemo(
		() => ({
			findUsers: findUsers.loading,
			removeUser: removeUser.loading,
		}),
		[findUsers.loading, removeUser.loading]
	)

	const onRemoveUser = async (id: string) => {
		await removeUser.execute(id)
		removeUserPopUp.close()
		await findUsers.execute(findUsers.pagination.limit, findUsers.pagination.offset)
	}

	const onPaginationChange = (event: TablePaginationConfig) => {
		const newPage = event.current!
		const newLimit = event.pageSize!
		const newOffset = (newPage - 1) * newLimit
		findUsers.execute(newLimit, newOffset)
	}

	useEffect(() => {
		findUsers.execute(findUsers.pagination.limit, findUsers.pagination.offset)
	}, [])

	return {
		data: usersWithRoles,
		pagination: findUsers.pagination,
		loadings,
		removeUserPopUp,
		onRemoveUser,
		onPaginationChange,
	}
}
