import { useEffect, useState } from 'react'
import type { IJsonUser } from '@princesitas/core'

import { useHttpClient } from '@/hooks/use-http-client'
import { useProviders } from '@/providers/utils/use-providers'
import { toastProvider } from '@/providers/toast-provider'

export const useUsers = () => {
	const http = useHttpClient()
	const { toast } = useProviders([toastProvider])
	const [usersData, setUsersData] = useState({
		users: [] as IJsonUser[],
		limit: 0,
		offset: 0,
		total: 0,
		loading: false,
	})

	const getUsers = async () => {
		try {
			setUsersData((prev) => ({ ...prev, loading: true }))
			const { data } = await http.get<IGetUsersResponse>('/users')
			setUsersData({
				users: data.data,
				limit: data.limit,
				offset: data.offset,
				total: data.total,
				loading: false,
			})
		} catch {
			toast.show('error', 'Ocurrió un error al obtener los usuarios')
			setUsersData((prev) => ({ ...prev, loading: false }))
		}
	}

	useEffect(() => {
		getUsers()
	}, [])

	return {
		usersData,
		getUsers,
	}
}

interface IGetUsersResponse {
	data: IJsonUser[]
	limit: number
	offset: number
	total: number
}
