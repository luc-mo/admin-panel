import { getAuth, signInWithEmailAndPassword, onIdTokenChanged, type User } from 'firebase/auth'
import { cloudSdkService } from '@/infrastructure/services/cloud-sdk-service'
import type { ICredentials } from '@/domain/credentials'

const _auth = getAuth(cloudSdkService)

const isAuthenticated = async (): Promise<boolean> => {
	const user = _auth.currentUser
	return user !== null
}

const logIn = async ({ email, password }: ICredentials): Promise<string> => {
	const credentials = await signInWithEmailAndPassword(_auth, email, password)
	return await credentials.user.getIdToken()
}

const logOut = async () => {
	const shouldLogOut = await isAuthenticated()
	if (!shouldLogOut) return
	await _auth.signOut()
}

const getAccessToken = async (forceRefresh: boolean): Promise<string | null> => {
	return _auth.currentUser ? await _auth.currentUser.getIdToken(forceRefresh) : null
}

const onSessionChange = (callback: (accessToken: string | null) => void) => {
	return onIdTokenChanged(_auth, async (user: User | null) => {
		const accessToken = user ? await user.getIdToken() : null
		callback(accessToken)
	})
}

export const authService = {
	isAuthenticated,
	logIn,
	logOut,
	getAccessToken,
	onSessionChange,
}
