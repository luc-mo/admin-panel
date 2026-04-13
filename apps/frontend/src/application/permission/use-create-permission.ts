import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseCreatePermissionProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export interface ICreatePermissionParams {
	key: string
	name: string
}

export const useCreatePermission = ({ coreServices, toast }: IUseCreatePermissionProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (params: ICreatePermissionParams) => {
		try {
			setLoading(true)
			const response = await coreServices.permissionService.create(params)
			toast.show('success', 'Permiso creado exitosamente')
			return response.data
		} catch {
			toast.show('error', 'Ocurrió un error al crear el permiso')
			return null
		} finally {
			setLoading(false)
		}
	}

	return { loading, execute }
}
