import { useMemo } from 'react'
import type { TablePaginationConfig } from 'antd'

import { usePopUp } from '@/shared/hooks/use-pop-up'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'
import { allRolesProvider } from '@/ui/providers/roles-provider'
import { useRemoveRole } from '@/application/role/use-remove-role'

export const useRoles = () => {
	const { allRoles, ...providers } = useProviders([
		coreServicesProvider,
		toastProvider,
		allRolesProvider,
	])
	const removeRole = useRemoveRole(providers)
	const removeRolePopUp = usePopUp()

	const loadings = useMemo(
		() => ({
			findAllRoles: allRoles.loading,
			removeRole: removeRole.loading,
		}),
		[allRoles.loading, removeRole.loading]
	)

	const onRemoveRole = async (id: string) => {
		await removeRole.execute(id)
		removeRolePopUp.close()
		await allRoles.execute()
	}

	const onPaginationChange = (event: TablePaginationConfig) => {
		const page = event.current!
		const limit = event.pageSize!
		const offset = (page - 1) * limit
		const newPagination = { page, limit, offset }
		allRoles.onPaginationChange(newPagination)
	}

	return {
		data: allRoles.data,
		pagination: allRoles.pagination,
		loadings,
		removeRolePopUp,
		onRemoveRole,
		onPaginationChange,
	}
}
