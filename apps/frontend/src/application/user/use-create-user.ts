import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseCreateUserProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export interface ICreateUserParams {
	email: string
	username: string
	password: string
	roles: string[]
}

export const useCreateUser = ({ coreServices, toast }: IUseCreateUserProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (params: ICreateUserParams) => {
		try {
			setLoading(true)
			const response = await coreServices.userService.create(params)
			toast.show('success', 'Usuario creado exitosamente')
			return response.data
		} catch {
			toast.show('error', 'Ocurrió un error al crear el usuario')
			return null
		} finally {
			setLoading(false)
		}
	}

	return { loading, execute }
}
