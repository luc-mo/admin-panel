const getItem = <T>(key: string, deserializer: (value: string) => T): T | null => {
	const item = localStorage.getItem(key)
	if (item === null) return null
	return deserializer(item)
}

const setItem = <T>(key: string, value: T, serializer: (value: T) => string) => {
	localStorage.setItem(key, serializer(value))
}

const removeItem = (key: string) => {
	localStorage.removeItem(key)
}

export const localStorageService = { getItem, setItem, removeItem }
