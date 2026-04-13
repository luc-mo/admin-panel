import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseUpdatePermissionProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export interface IUpdatePermissionParams {
	id: string
	key?: string
	name?: string
}

export const useUpdatePermission = ({ coreServices, toast }: IUseUpdatePermissionProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (params: IUpdatePermissionParams) => {
		try {
			setLoading(true)
			const response = await coreServices.permissionService.update(params)
			toast.show('success', 'Permiso actualizado exitosamente')
			return response.data
		} catch {
			toast.show('error', 'Ocurrió un error al actualizar el permiso')
			return null
		} finally {
			setLoading(false)
		}
	}

	return { loading, execute }
}
