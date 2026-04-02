import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseRemoveUserProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export const useRemoveUser = ({ coreServices, toast }: IUseRemoveUserProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (id: string) => {
		try {
			setLoading(true)
			await coreServices.userService.removeUser({ id })
			toast.show('success', 'Usuario eliminado correctamente')
		} catch {
			toast.show('error', 'Ocurrió un error al eliminar el usuario')
		}
		setLoading(false)
	}

	return { loading, execute }
}
