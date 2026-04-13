import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseRemoveRoleProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export const useRemoveRole = ({ coreServices, toast }: IUseRemoveRoleProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (id: string) => {
		try {
			setLoading(true)
			await coreServices.roleService.remove({ id })
			toast.show('success', 'Rol eliminado correctamente')
		} catch {
			toast.show('error', 'Ocurrió un error al eliminar el rol')
		}
		setLoading(false)
	}

	return { loading, execute }
}
