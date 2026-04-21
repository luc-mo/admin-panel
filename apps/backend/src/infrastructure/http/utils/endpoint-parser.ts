import { Logger } from '@snowdrive/logger'
import { match } from 'path-to-regexp'

@Logger({ severity: 'INFO' })
export class EndpointParser {
	public parse(path: string, routes: string[]) {
		const route = routes.find((route) => {
			const matcher = match(route, { decode: decodeURIComponent })
			return matcher(path) !== false
		})
		return route || null
	}
}
