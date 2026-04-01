import { useMemo, useEffect } from 'react'
import type { TablePaginationConfig } from 'antd'

import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'
import { useFindUsers } from '@/application/user/use-find-users'

export const useUsers = () => {
	const providers = useProviders([coreServicesProvider, toastProvider])
	const { usersData, findUsers } = useFindUsers(providers)

	const page = useMemo(() => {
		return Math.floor(usersData.offset / usersData.limit) + 1
	}, [usersData])

	const onPaginationChange = (event: TablePaginationConfig) => {
		const newPage = event.current!
		const newLimit = event.pageSize!
		const newOffset = (newPage - 1) * newLimit
		findUsers(newLimit, newOffset)
	}

	useEffect(() => {
		findUsers(usersData.limit, usersData.offset)
	}, [])

	return { ...usersData, page, onPaginationChange }
}
