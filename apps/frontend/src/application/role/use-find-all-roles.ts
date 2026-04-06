import { useState, useMemo } from 'react'
import type { IRole, StrictOmit } from '@princesitas/core'
import type { IPagination } from '@/domain/pagination'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseFindAllRolesProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export const useFindAllRoles = ({ coreServices, toast }: IUseFindAllRolesProps) => {
	const [data, setData] = useState<IRole[]>([])
	const [loading, setLoading] = useState(false)
	const [pagination, setPagination] = useState(_initialPagination)
	const dataMap = useMemo(() => new Map(data.map((item) => [item.id, item])), [data])

	const execute = async () => {
		try {
			setLoading(true)
			const response = await coreServices.roleService.findAllRoles()
			setData(response.data)
			setPagination((prev) => ({
				total: response.total,
				limit: prev.limit,
				offset: 0,
				page: 1,
			}))
			setLoading(false)
		} catch {
			toast.show('error', 'Ocurrió un error al obtener los roles')
			setData([])
			setPagination(_initialPagination)
		}
	}

	const onPaginationChange = (pagination: StrictOmit<IPagination, 'total'>) => {
		setPagination((prev) => ({ ...prev, ...pagination }))
	}

	return {
		data,
		dataMap,
		pagination,
		loading,
		execute,
		onPaginationChange,
	}
}

const _initialPagination = {
	limit: 10,
	offset: 0,
	total: 0,
	page: 1,
}
