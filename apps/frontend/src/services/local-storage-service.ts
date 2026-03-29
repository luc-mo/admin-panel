function getItem<T>(key: string, deserializer: (value: string) => T): T | null
function getItem<T>(key: string): T | null
function getItem<T>(key: string, deserializer?: (value: string) => T): T | string | null {
	const item = localStorage.getItem(key)
	if (item === null) return null
	if (deserializer) return deserializer(item)
	return item
}

function setItem<T>(key: string, value: T): void
function setItem<T>(key: string, value: T, serializer: (value: T) => string): void
function setItem<T>(key: string, value: T, serializer?: (value: T) => string) {
	if (serializer) localStorage.setItem(key, serializer(value))
	else localStorage.setItem(key, value as string)
}

const removeItem = (key: string) => {
	localStorage.removeItem(key)
}

export const localStorageService = { getItem, setItem, removeItem }
