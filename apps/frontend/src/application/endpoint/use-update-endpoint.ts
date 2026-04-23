import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'
import type { IEndpointMethod } from '@admin-panel/core'

interface IUseUpdateEndpointProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export interface IUpdateEndpointParams {
	id: string
	method?: IEndpointMethod
	path?: string
	roles?: string[]
}

export const useUpdateEndpoint = ({ coreServices, toast }: IUseUpdateEndpointProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (params: IUpdateEndpointParams) => {
		try {
			setLoading(true)
			const response = await coreServices.endpointService.update(params)
			toast.show('success', 'Endpoint actualizado exitosamente')
			return response.data
		} catch {
			toast.show('error', 'Ocurrió un error al actualizar el endpoint')
			return null
		} finally {
			setLoading(false)
		}
	}

	return { loading, execute }
}
