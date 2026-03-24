export class ArrayUtils {
	public static unique<T>(array: T[]): T[] {
		return Array.from(new Set(array))
	}

	public static chunk<T>(array: T[], size: number): T[][] {
		const chunks: T[][] = []
		for (let i = 0; i < array.length; i += size) {
			chunks.push(array.slice(i, i + size))
		}
		return chunks
	}

	public static async asyncFlatMap<T, U>(
		array: T[],
		callback: (item: T, index: number, array: T[]) => Promise<U[]>
	) {
		const results = await Promise.all(array.map(callback))
		return results.flat()
	}
}
