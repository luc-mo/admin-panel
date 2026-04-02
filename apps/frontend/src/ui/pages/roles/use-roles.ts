import { useMemo, useEffect } from 'react'
import type { TablePaginationConfig } from 'antd'

import { usePopUp } from '@/shared/hooks/use-pop-up'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'

import { useFindRoles } from '@/application/role/use-find-roles'
import { useRemoveRole } from '@/application/role/use-remove-role'

export const useRoles = () => {
	const providers = useProviders([coreServicesProvider, toastProvider])
	const findRoles = useFindRoles(providers)
	const removeRole = useRemoveRole(providers)
	const removeRolePopUp = usePopUp()

	const loadings = useMemo(
		() => ({
			findRoles: findRoles.loading,
			removeRole: removeRole.loading,
		}),
		[findRoles.loading, removeRole.loading]
	)

	const onRemoveRole = async (id: string) => {
		await removeRole.execute(id)
		removeRolePopUp.close()
		await findRoles.execute(findRoles.pagination.limit, findRoles.pagination.offset)
	}

	const onPaginationChange = (event: TablePaginationConfig) => {
		const newPage = event.current!
		const newLimit = event.pageSize!
		const newOffset = (newPage - 1) * newLimit
		findRoles.execute(newLimit, newOffset)
	}

	useEffect(() => {
		findRoles.execute(findRoles.pagination.limit, findRoles.pagination.offset)
	}, [])

	return {
		data: findRoles.data,
		pagination: findRoles.pagination,
		loadings,
		removeRolePopUp,
		onRemoveRole,
		onPaginationChange,
	}
}
