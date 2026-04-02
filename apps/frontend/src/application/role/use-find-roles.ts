import { useState } from 'react'
import type { IRole } from '@princesitas/core'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseFindRolesProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export const useFindRoles = ({ coreServices, toast }: IUseFindRolesProps) => {
	const [data, setData] = useState<IRole[]>([])
	const [loading, setLoading] = useState(false)
	const [pagination, setPagination] = useState(_initialPagination)

	const execute = async (limit: number, offset: number) => {
		try {
			setLoading(true)
			const response = await coreServices.roleService.findRoles({ limit, offset })
			setData(response.data)
			setPagination({
				limit: response.limit,
				offset: response.offset,
				total: response.total,
				page: Math.floor(response.offset / response.limit) + 1,
			})
			setLoading(false)
		} catch {
			toast.show('error', 'Ocurrió un error al obtener los roles')
			setData([])
			setPagination(_initialPagination)
		}
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
