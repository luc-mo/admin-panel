import { useMemo } from 'react'
import type { TablePaginationConfig } from 'antd'

import { usePopUp } from '@/shared/hooks/use-pop-up'
import { useToggle } from '@/shared/hooks/use-toggle'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'

import { useRemoveRole } from '@/application/role/use-remove-role'
import { useCreateRole } from '@/application/role/use-create-role'
import { useUpdateRole } from '@/application/role/use-update-role'
import type { IRoleWithPermissions, ParameterCommand } from '@admin-panel/core'

export const useRoles = () => {
	const { sharedData, ...providers } = useProviders([
		coreServicesProvider,
		toastProvider,
		sharedDataProvider,
	])
	const createRole = useCreateRole(providers)
	const updateRole = useUpdateRole(providers)
	const removeRole = useRemoveRole(providers)

	const createRoleToggle = useToggle(false)
	const viewRolePopUp = usePopUp()
	const removeRolePopUp = usePopUp()
	const updateRolePopUp = usePopUp()

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
			createRole: createRole.loading,
			updateRole: updateRole.loading,
			removeRole: removeRole.loading,
		}),
		[sharedData.allRoles.loading, createRole.loading, updateRole.loading, removeRole.loading]
	)

	const onCreateRole = async (params: ParameterCommand<typeof createRole.execute>) => {
		const createdRole = await createRole.execute(params)
		if (!createdRole) return
		createRoleToggle.close()
		await sharedData.allRoles.execute()
	}

	const onUpdateRole = async (params: ParameterCommand<typeof updateRole.execute>) => {
		const updatedRole = await updateRole.execute(params)
		if (!updatedRole) return
		updateRolePopUp.close()
		await sharedData.allRoles.execute()
	}

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
		createRoleToggle,
		viewRolePopUp,
		updateRolePopUp,
		removeRolePopUp,
		onCreateRole,
		onUpdateRole,
		onRemoveRole,
		onPaginationChange,
	}
}
