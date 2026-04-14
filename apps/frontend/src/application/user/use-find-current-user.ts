import { useState } from 'react'
import type { IUser } from '@princesitas/core'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseFindCurrentUserProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export const useFindCurrentUser = ({ coreServices, toast }: IUseFindCurrentUserProps) => {
	const [data, setData] = useState<IUser | null>(null)
	const [loading, setLoading] = useState(false)

	const execute = async () => {
		try {
			setLoading(true)
			const response = await coreServices.userService.me()
			setData(response.data)
		} catch {
			toast.show('error', 'Ocurrió un error al obtener los datos del usuario')
		}
		setLoading(false)
	}

	return { data, loading, execute }
}
