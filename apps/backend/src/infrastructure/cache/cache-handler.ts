import type admin from 'firebase-admin'
import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'

@Logger({ severity: 'DEBUG' })
export class FirebaseCacheHandler extends InjectableDependency(
	'admin',
	'config',
	'cloudSdkService'
) {
	private _cache: admin.database.Database | null = null

	public getInstance() {
		if (!this._cache) {
			this._cache = this._createInstance()
		}
		return this._cache
	}

	private _createInstance() {
		try {
			Logger.info('Initializing Firebase Realtime Database instance')
			const app = this._cloudSdkService.getApp()
			return this._admin.database(app)
		} catch (error) {
			Logger.error(`Error initializing Firebase Realtime Database instance: ${error}`)
			throw new Error(`Error initializing Firebase Realtime Database instance: ${error}`)
		}
	}
}
