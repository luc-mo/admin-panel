import { useMemo } from 'react'
import type { TablePaginationConfig } from 'antd'

import { usePopUp } from '@/shared/hooks/use-pop-up'
import { useToggle } from '@/shared/hooks/use-toggle'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'

import { useCreatePermission } from '@/application/permission/use-create-permission'
import { useUpdatePermission } from '@/application/permission/use-update-permission'
import { useRemovePermission } from '@/application/permission/use-remove-permission'
import type { ParameterCommand } from '@princesitas/core'

export const usePermissions = () => {
	const { sharedData, ...providers } = useProviders([
		coreServicesProvider,
		toastProvider,
		sharedDataProvider,
	])
	const createPermission = useCreatePermission(providers)
	const updatePermission = useUpdatePermission(providers)
	const removePermission = useRemovePermission(providers)

	const createPermissionToggle = useToggle(false)
	const viewPermissionPopUp = usePopUp()
	const updatePermissionPopUp = usePopUp()
	const removePermissionPopUp = usePopUp()

	const loadings = useMemo(
		() => ({
			findAllPermissions: sharedData.allPermissions.loading,
			createPermission: createPermission.loading,
			updatePermission: updatePermission.loading,
			removePermission: removePermission.loading,
		}),
		[
			sharedData.allPermissions.loading,
			createPermission.loading,
			updatePermission.loading,
			removePermission.loading,
		]
	)

	const onCreatePermission = async (params: ParameterCommand<typeof createPermission.execute>) => {
		const created = await createPermission.execute(params)
		if (!created) return
		createPermissionToggle.close()
		await sharedData.allPermissions.execute()
	}

	const onUpdatePermission = async (params: ParameterCommand<typeof updatePermission.execute>) => {
		const updated = await updatePermission.execute(params)
		if (!updated) return
		updatePermissionPopUp.close()
		await sharedData.allPermissions.execute()
	}

	const onRemovePermission = async (id: string) => {
		await removePermission.execute(id)
		removePermissionPopUp.close()
		await sharedData.allPermissions.execute()
	}

	const onPaginationChange = (event: TablePaginationConfig) => {
		const page = event.current!
		const limit = event.pageSize!
		const offset = (page - 1) * limit
		const newPagination = { page, limit, offset }
		sharedData.allPermissions.onPaginationChange(newPagination)
	}

	return {
		data: sharedData.allPermissions.data,
		pagination: sharedData.allPermissions.pagination,
		loadings,
		createPermissionToggle,
		viewPermissionPopUp,
		updatePermissionPopUp,
		removePermissionPopUp,
		onCreatePermission,
		onUpdatePermission,
		onRemovePermission,
		onPaginationChange,
	}
}
