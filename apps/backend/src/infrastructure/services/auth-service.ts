import type admin from 'firebase-admin'
import { Logger } from '@snowdrive/logger'
import { InjectableDependency } from '@/shared/injectable-dependency'

@Logger({ severity: 'DEBUG' })
export class FirebaseAuthService extends InjectableDependency('admin', 'cloudSdkService') {
	private _auth: admin.auth.Auth | null = null

	public getAuth() {
		if (!this._auth) {
			this._auth = this._createAuth()
		}
		return this._auth
	}

	public async validateToken(token: string) {
		const auth = this.getAuth()
		return auth.verifyIdToken(token)
	}

	public async createUser(params: ICreateUserParams) {
		const auth = this.getAuth()
		return auth.createUser({
			uid: params.id,
			email: params.email,
			password: params.password,
			displayName: params.username,
		})
	}

	public async removeUser(id: string) {
		const auth = this.getAuth()
		return auth.deleteUser(id)
	}

	private _createAuth() {
		try {
			Logger.info('Initializing Firebase Auth instance')
			const app = this._cloudSdkService.getApp()
			return this._admin.auth(app)
		} catch (error) {
			Logger.error(`Error initializing Firebase Auth instance: ${error}`)
			throw new Error(`Error initializing Firebase Auth instance: ${error}`)
		}
	}
}

interface ICreateUserParams {
	id: string
	email: string
	password: string
	username: string
}
