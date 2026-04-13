import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseUpdateUserProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export interface IUpdateUserParams {
	id: string
	username?: string
	roles?: string[]
}

export const useUpdateUser = ({ coreServices, toast }: IUseUpdateUserProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (params: IUpdateUserParams) => {
		try {
			setLoading(true)
			const response = await coreServices.userService.update(params)
			toast.show('success', 'Usuario actualizado exitosamente')
			return response.data
		} catch {
			toast.show('error', 'Ocurrió un error al actualizar el usuario')
			return null
		} finally {
			setLoading(false)
		}
	}

	return { loading, execute }
}
