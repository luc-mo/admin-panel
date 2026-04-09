import { useMemo, useEffect } from 'react'
import type { TablePaginationConfig } from 'antd'

import { useToggle } from '@/shared/hooks/use-toggle'
import { usePopUp } from '@/shared/hooks/use-pop-up'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'

import { useFindUsers } from '@/application/user/use-find-users'
import { useCreateUser } from '@/application/user/use-create-user'
import { useUpdateUser } from '@/application/user/use-update-user'
import { useRemoveUser } from '@/application/user/use-remove-user'
import type { IUserWithRoles, IRoleCategory, ParameterCommand } from '@princesitas/core'

export const useUsers = () => {
	const { sharedData, ...providers } = useProviders([
		coreServicesProvider,
		toastProvider,
		sharedDataProvider,
	])
	const findUsers = useFindUsers(providers)
	const createUser = useCreateUser(providers)
	const updateUser = useUpdateUser(providers)
	const removeUser = useRemoveUser(providers)

	const createUserToggle = useToggle(false)
	const updateUserToggle = usePopUp()
	const removeUserPopUp = usePopUp()

	const usersWithRoles: IUserWithRoles[] = useMemo(() => {
		return findUsers.data.map((user) => {
			const roles = user.roles
				.map((roleId) => sharedData.allRoles.dataMap.get(roleId)!)
				.filter(Boolean)
				.sort((a, b) => {
					const categoryOrder: IRoleCategory[] = ['ADMIN', 'EDITOR', 'READER', 'OTHER']
					return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
				})
			return { ...user, roles }
		})
	}, [findUsers.data, sharedData.allRoles.dataMap])

	const loadings = useMemo(
		() => ({
			findUsers: findUsers.loading,
			createUser: createUser.loading,
			updateUser: updateUser.loading,
			removeUser: removeUser.loading,
		}),
		[findUsers.loading, createUser.loading, updateUser.loading, removeUser.loading]
	)

	const onRefreshUsers = async () => {
		await findUsers.execute(findUsers.pagination.limit, findUsers.pagination.offset)
	}

	const onCreateUser = async (params: ParameterCommand<typeof createUser.execute>) => {
		const createdUser = await createUser.execute(params)
		if (!createdUser) return
		createUserToggle.close()
		await onRefreshUsers()
	}

	const onUpdateUser = async (params: ParameterCommand<typeof updateUser.execute>) => {
		const updatedUser = await updateUser.execute(params)
		if (!updatedUser) return
		updateUserToggle.close()
		await onRefreshUsers()
	}

	const onRemoveUser = async (id: string) => {
		const removedUser = await removeUser.execute(id)
		if (!removedUser) return
		removeUserPopUp.close()
		await onRefreshUsers()
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
		createUserToggle,
		updateUserToggle,
		removeUserPopUp,
		onRefreshUsers,
		onCreateUser,
		onUpdateUser,
		onRemoveUser,
		onPaginationChange,
	}
}
