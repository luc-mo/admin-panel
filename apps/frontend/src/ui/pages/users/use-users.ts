import { useMemo, useEffect } from 'react'
import type { TablePaginationConfig } from 'antd'

import { usePopUp } from '@/shared/hooks/use-pop-up'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'

import { useFindUsers } from '@/application/user/use-find-users'
import { useRemoveUser } from '@/application/user/use-remove-user'

export const useUsers = () => {
	const providers = useProviders([coreServicesProvider, toastProvider])
	const findUsers = useFindUsers(providers)
	const removeUser = useRemoveUser(providers)
	const removeUserPopUp = usePopUp()

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
		data: findUsers.data,
		pagination: findUsers.pagination,
		loadings,
		removeUserPopUp,
		onRemoveUser,
		onPaginationChange,
	}
}
