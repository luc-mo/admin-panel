import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'
import type { IEndpointMethod } from '@admin-panel/core'

interface IUseCreateEndpointProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export interface ICreateEndpointParams {
	method: IEndpointMethod
	path: string
	roles: string[]
}

export const useCreateEndpoint = ({ coreServices, toast }: IUseCreateEndpointProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (params: ICreateEndpointParams) => {
		try {
			setLoading(true)
			const response = await coreServices.endpointService.create(params)
			toast.show('success', 'Endpoint creado exitosamente')
			return response.data
		} catch {
			toast.show('error', 'Ocurrió un error al crear el endpoint')
			return null
		} finally {
			setLoading(false)
		}
	}

	return { loading, execute }
}
