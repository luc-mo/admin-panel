import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'
import type { IRoleCategory } from '@princesitas/core'

interface IUseUpdateRoleProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export interface IUpdateRoleParams {
	id: string
	name?: string
	description?: string
	category?: IRoleCategory
	permissions?: string[]
}

export const useUpdateRole = ({ coreServices, toast }: IUseUpdateRoleProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (params: IUpdateRoleParams) => {
		try {
			setLoading(true)
			const response = await coreServices.roleService.update(params)
			toast.show('success', 'Rol actualizado exitosamente')
			return response.data
		} catch {
			toast.show('error', 'Ocurrió un error al actualizar el rol')
			return null
		} finally {
			setLoading(false)
		}
	}

	return { loading, execute }
}
