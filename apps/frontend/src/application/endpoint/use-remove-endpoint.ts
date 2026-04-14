import { useState } from 'react'
import type { ICoreServicesContext } from '@/ui/providers/core-services-provider'
import type { IToastContext } from '@/ui/providers/toast-provider'

interface IUseRemoveEndpointProps {
	coreServices: ICoreServicesContext
	toast: IToastContext
}

export const useRemoveEndpoint = ({ coreServices, toast }: IUseRemoveEndpointProps) => {
	const [loading, setLoading] = useState(false)

	const execute = async (id: string) => {
		try {
			setLoading(true)
			const response = await coreServices.endpointService.remove({ id })
			toast.show('success', 'Endpoint eliminado correctamente')
			return response.data
		} catch {
			toast.show('error', 'Ocurrió un error al eliminar el endpoint')
			return null
		} finally {
			setLoading(false)
		}
	}

	return { loading, execute }
}
