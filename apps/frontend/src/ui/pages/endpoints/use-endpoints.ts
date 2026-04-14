import { useEffect, useMemo } from 'react'
import type { TablePaginationConfig } from 'antd'
import type { IEndpointWithRoles } from '@princesitas/core'

import { usePopUp } from '@/shared/hooks/use-pop-up'
import { useProviders } from '@/ui/providers/utils/use-providers'
import { coreServicesProvider } from '@/ui/providers/core-services-provider'
import { toastProvider } from '@/ui/providers/toast-provider'
import { sharedDataProvider } from '@/ui/providers/shared-data-provider'

import { useFindEndpoints } from '@/application/endpoint/use-find-endpoints'
import { useRemoveEndpoint } from '@/application/endpoint/use-remove-endpoint'

export const useEndpoints = () => {
	const { sharedData, ...providers } = useProviders([
		coreServicesProvider,
		toastProvider,
		sharedDataProvider,
	])
	const findEndpoints = useFindEndpoints(providers)
	const removeEndpoint = useRemoveEndpoint(providers)

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
			removeEndpoint: removeEndpoint.loading,
		}),
		[findEndpoints.loading, removeEndpoint.loading]
	)

	const onRefreshEndpoints = async () => {
		await findEndpoints.execute(findEndpoints.pagination.limit, findEndpoints.pagination.offset)
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
		removeEndpointPopUp,
		onRemoveEndpoint,
		onRefreshEndpoints,
		onPaginationChange,
	}
}
