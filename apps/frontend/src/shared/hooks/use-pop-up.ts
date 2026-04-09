import { useState } from 'react'

export const usePopUp = () => {
	const [openId, setOpenId] = useState<string | null>(null)

	const isOpen = (id: string) => openId === id

	const open = (id: string) => setOpenId(id)

	const close = () => setOpenId(null)

	const toggle = (id: string) => (isOpen: boolean) => {
		if (isOpen) open(id)
		else close()
	}

	return { openId, isOpen, open, close, toggle }
}
