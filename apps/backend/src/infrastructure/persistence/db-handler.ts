import type admin from 'firebase-admin'
import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@snowdrive/utils'

@Logger({ severity: 'DEBUG' })
export class FirebaseDbHandler extends InjectableDependency('admin', 'config', 'cloudSdkService') {
	private _db: admin.firestore.Firestore | null = null

	public getCollection<T>(path: string) {
		const instance = this.getInstance()
		return instance.collection(path) as admin.firestore.CollectionReference<T>
	}

	public getInstance() {
		if (!this._db) {
			this._db = this._createInstance()
		}
		return this._db
	}

	private _createInstance() {
		try {
			Logger.info('Initializing Firestore instance')
			const app = this._cloudSdkService.getApp()
			const db = this._admin.firestore(app)
			db.settings({
				databaseId: this._config.firebase.firestoreDatabaseId,
				ignoreUndefinedProperties: true,
			})
			return db
		} catch (error) {
			Logger.error(`Error initializing Firestore instance: ${error}`)
			throw new Error(`Error initializing Firestore instance: ${error}`)
		}
	}
}
