import { useState } from 'react'
import type { IUser } from '@princesitas/core'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseFindUsersProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export const useFindUsers = ({ coreServices, toast }: IUseFindUsersProps) => {
	const [usersData, setUsersData] = useState({
		users: [] as IUser[],
		limit: 10,
		offset: 0,
		total: 0,
		loading: false,
	})

	const findUsers = async (limit: number, offset: number) => {
		try {
			setUsersData((prev) => ({ ...prev, loading: true }))
			const response = await coreServices.usersService.findUsers({ limit, offset })
			setUsersData({
				users: response.data,
				limit: response.limit,
				offset: response.offset,
				total: response.total,
				loading: false,
			})
		} catch {
			toast.show('error', 'Ocurrió un error al obtener los usuarios')
			setUsersData((prev) => ({ ...prev, loading: false }))
		}
	}

	return { usersData, findUsers }
}
