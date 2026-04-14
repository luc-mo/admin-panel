import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseRemovePermissionProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export const useRemovePermission = ({ coreServices, toast }: IUseRemovePermissionProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (id: string) => {
		try {
			setLoading(true)
			await coreServices.permissionService.remove({ id })
			toast.show('success', 'Permiso eliminado correctamente')
		} catch {
			toast.show('error', 'Ocurrió un error al eliminar el permiso')
		}
		setLoading(false)
	}

	return { loading, execute }
}
