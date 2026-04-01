import { useState } from 'react'

export const useLoadings = <T extends Record<string, boolean>>(initialState: T) => {
	const [loadings, setLoadings] = useState<T>(initialState)

	const setLoading = (values: Partial<T>) => {
		setLoadings((prev) => ({ ...prev, ...values }))
	}

	return { loadings, setLoading }
}
