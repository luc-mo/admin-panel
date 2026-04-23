import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'
import type { IRoleCategory } from '@admin-panel/core'

interface IUseCreateRoleProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export interface ICreateRoleParams {
	name: string
	description: string
	category: IRoleCategory
	permissions: string[]
}

export const useCreateRole = ({ coreServices, toast }: IUseCreateRoleProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (params: ICreateRoleParams) => {
		try {
			setLoading(true)
			const response = await coreServices.roleService.create(params)
			toast.show('success', 'Rol creado exitosamente')
			return response.data
		} catch {
			toast.show('error', 'Ocurrió un error al crear el rol')
			return null
		} finally {
			setLoading(false)
		}
	}

	return { loading, execute }
}
