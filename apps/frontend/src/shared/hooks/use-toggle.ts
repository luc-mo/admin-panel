import { useState, useMemo } from 'react'

export const useToggle = (initialValue: boolean) => {
	const [value, setValue] = useState(initialValue)

	const isOpen = useMemo(() => value, [value])

	const open = () => setValue(true)

	const close = () => setValue(false)

	const toggle = () => setValue((prev) => !prev)

	return { isOpen, open, close, toggle }
}
