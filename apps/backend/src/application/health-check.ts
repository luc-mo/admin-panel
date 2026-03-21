import { Logger } from '@snowdrive/logger'

@Logger({ severity: 'INFO' })
export class HealthCheck {
	public async execute() {
		return {
			status: 'OK',
			timestamp: new Date().toISOString(),
		}
	}
}
