import type admin from 'firebase-admin'
import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'

@Logger({ severity: 'DEBUG' })
export class FirebaseCloudSdkService extends InjectableDependency('admin', 'config') {
	private _app: admin.app.App | null = null

	public getApp() {
		if (!this._app) {
			this._app = this._initializeApp()
		}
		return this._app
	}

	public disconnect() {
		if (this._app) {
			this._app.delete()
		}
		this._app = null
	}

	private _initializeApp() {
		try {
			Logger.debug('Initializing Firebase app')
			return this._admin.initializeApp({
				credential: this._admin.credential.cert({
					projectId: this._config.firebase.projectId,
					clientEmail: this._config.firebase.clientEmail,
					privateKey: this._config.firebase.privateKey,
				}),
			})
		} catch (error) {
			Logger.error(`Error initializing Firebase app: ${error}`)
			throw new Error(`Error initializing Firebase app: ${error}`)
		}
	}
}
