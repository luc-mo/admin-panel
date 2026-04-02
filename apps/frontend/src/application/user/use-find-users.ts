import { useState } from 'react'
import type { IUser } from '@princesitas/core'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseFindUsersProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export const useFindUsers = ({ coreServices, toast }: IUseFindUsersProps) => {
	const [data, setData] = useState<IUser[]>([])
	const [loading, setLoading] = useState(false)
	const [pagination, setPagination] = useState(_initialPagination)

	const execute = async (limit: number, offset: number) => {
		try {
			setLoading(true)
			const response = await coreServices.usersService.findUsers({ limit, offset })
			setData(response.data)
			setPagination({
				limit: response.limit,
				offset: response.offset,
				total: response.total,
				page: Math.floor(response.offset / response.limit) + 1,
			})
			setLoading(false)
		} catch {
			toast.show('error', 'Ocurrió un error al obtener los usuarios')
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
