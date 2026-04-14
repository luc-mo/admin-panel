import { useState } from 'react'
import type { IEndpoint } from '@princesitas/core'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseFindEndpointsProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export const useFindEndpoints = ({ coreServices, toast }: IUseFindEndpointsProps) => {
	const [data, setData] = useState<IEndpoint[]>([])
	const [loading, setLoading] = useState(false)
	const [pagination, setPagination] = useState(_initialPagination)

	const execute = async (limit: number, offset: number) => {
		try {
			setLoading(true)
			const response = await coreServices.endpointService.find({ limit, offset })
			setData(response.data)
			setPagination({
				limit: response.limit,
				offset: response.offset,
				total: response.total,
				page: Math.floor(response.offset / response.limit) + 1,
			})
		} catch {
			toast.show('error', 'Ocurrió un error al obtener los endpoints')
			setData([])
			setPagination(_initialPagination)
		}
		setLoading(false)
	}

	return {
		data,
		pagination,
		loading,
		execute,
	}
}

const _initialPagination = {
	limit: 10,
	offset: 0,
	total: 0,
	page: 1,
}
