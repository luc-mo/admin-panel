import { useEffect, useMemo } from 'react'
import type { TablePaginationConfig } from 'antd'
import type { IEndpointWithRoles, ParameterCommand } from '@princesitas/core'

import { useToggle } from '@/shared/hooks/use-toggle'
import { usePopUp } from '@/shared/hooks/use-pop-up'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'

import { useFindEndpoints } from '@/application/endpoint/use-find-endpoints'
import { useCreateEndpoint } from '@/application/endpoint/use-create-endpoint'
import { useUpdateEndpoint } from '@/application/endpoint/use-update-endpoint'
import { useRemoveEndpoint } from '@/application/endpoint/use-remove-endpoint'

export const useEndpoints = () => {
	const { sharedData, ...providers } = useProviders([
		coreServicesProvider,
		toastProvider,
		sharedDataProvider,
	])
	const findEndpoints = useFindEndpoints(providers)
	const createEndpoint = useCreateEndpoint(providers)
	const updateEndpoint = useUpdateEndpoint(providers)
	const removeEndpoint = useRemoveEndpoint(providers)

	const createEndpointToggle = useToggle(false)
	const viewEndpointPopUp = usePopUp()
	const updateEndpointToggle = usePopUp()
	const removeEndpointPopUp = usePopUp()

	const endpointsWithRoles: IEndpointWithRoles[] = useMemo(() => {
		return findEndpoints.data.map((endpoint) => {
			const roles = endpoint.roles
				.map((roleId) => sharedData.allRoles.dataMap.get(roleId)!)
				.filter(Boolean)
			return { ...endpoint, roles }
		})
	}, [findEndpoints.data, sharedData.allRoles.dataMap])

	const loadings = useMemo(
		() => ({
			findEndpoints: findEndpoints.loading,
			createEndpoint: createEndpoint.loading,
			updateEndpoint: updateEndpoint.loading,
			removeEndpoint: removeEndpoint.loading,
		}),
		[findEndpoints.loading, createEndpoint.loading, updateEndpoint.loading, removeEndpoint.loading]
	)

	const onRefreshEndpoints = async () => {
		await findEndpoints.execute(findEndpoints.pagination.limit, findEndpoints.pagination.offset)
	}

	const onCreateEndpoint = async (params: ParameterCommand<typeof createEndpoint.execute>) => {
		const created = await createEndpoint.execute(params)
		if (!created) return
		createEndpointToggle.close()
		await onRefreshEndpoints()
	}

	const onUpdateEndpoint = async (params: ParameterCommand<typeof updateEndpoint.execute>) => {
		const updated = await updateEndpoint.execute(params)
		if (!updated) return
		updateEndpointToggle.close()
		await onRefreshEndpoints()
	}

	const onRemoveEndpoint = async (id: string) => {
		const removed = await removeEndpoint.execute(id)
		if (!removed) return
		removeEndpointPopUp.close()
		await onRefreshEndpoints()
	}

	const onPaginationChange = (event: TablePaginationConfig) => {
		const newPage = event.current!
		const newLimit = event.pageSize!
		const newOffset = (newPage - 1) * newLimit
		findEndpoints.execute(newLimit, newOffset)
	}

	useEffect(() => {
		findEndpoints.execute(findEndpoints.pagination.limit, findEndpoints.pagination.offset)
	}, [])

	return {
		data: endpointsWithRoles,
		pagination: findEndpoints.pagination,
		loadings,
		createEndpointToggle,
		viewEndpointPopUp,
		updateEndpointToggle,
		removeEndpointPopUp,
		onRefreshEndpoints,
		onCreateEndpoint,
		onUpdateEndpoint,
		onRemoveEndpoint,
		onPaginationChange,
	}
}
