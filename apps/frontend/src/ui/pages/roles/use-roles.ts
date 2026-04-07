import { useMemo } from 'react'
import type { TablePaginationConfig } from 'antd'

import { usePopUp } from '@/shared/hooks/use-pop-up'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'

import { useRemoveRole } from '@/application/role/use-remove-role'
import type { IRoleWithPermissions } from '@princesitas/core'

export const useRoles = () => {
	const { sharedData, ...providers } = useProviders([
		coreServicesProvider,
		toastProvider,
		sharedDataProvider,
	])
	const removeRole = useRemoveRole(providers)
	const removeRolePopUp = usePopUp()

	const rolesWithPermissions: IRoleWithPermissions[] = useMemo(() => {
		return sharedData.allRoles.data.map((role) => {
			const permissions = role.permissions
				.map((permissionId) => sharedData.allPermissions.dataMap.get(permissionId)!)
				.filter(Boolean)
				.sort((a, b) => {
					const aKey = a.key.split(':')[1]
					const bKey = b.key.split(':')[1]
					const order = ['create', 'list', 'view', 'update', 'delete']
					return order.indexOf(aKey) - order.indexOf(bKey)
				})
			return { ...role, permissions }
		})
	}, [sharedData.allRoles.data, sharedData.allPermissions.dataMap])

	const loadings = useMemo(
		() => ({
			findAllRoles: sharedData.allRoles.loading,
			removeRole: removeRole.loading,
		}),
		[sharedData.allRoles.loading, removeRole.loading]
	)

	const onRemoveRole = async (id: string) => {
		await removeRole.execute(id)
		removeRolePopUp.close()
		await sharedData.allRoles.execute()
	}

	const onPaginationChange = (event: TablePaginationConfig) => {
		const page = event.current!
		const limit = event.pageSize!
		const offset = (page - 1) * limit
		const newPagination = { page, limit, offset }
		sharedData.allRoles.onPaginationChange(newPagination)
	}

	return {
		data: rolesWithPermissions,
		pagination: sharedData.allRoles.pagination,
		loadings,
		removeRolePopUp,
		onRemoveRole,
		onPaginationChange,
	}
}
