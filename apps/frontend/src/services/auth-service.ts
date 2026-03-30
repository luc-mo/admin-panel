import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, type User } from 'firebase/auth'
import { cloudSdkService } from '@/services/cloud-sdk-service'

interface ILoginParams {
	email: string
	password: string
}

interface ILoginResult {
	accessToken: string
	refreshToken: string
	expiresIn: number
}

const _auth = getAuth(cloudSdkService)

const isAuthenticated = async (): Promise<boolean> => {
	const user = _auth.currentUser
	return user !== null
}

const logIn = async ({ email, password }: ILoginParams): Promise<ILoginResult> => {
	const credentials = await signInWithEmailAndPassword(_auth, email, password)
	return {
		accessToken: await credentials.user.getIdToken(),
		refreshToken: credentials.user.refreshToken,
		expiresIn: 3600,
	}
}

const logOut = async (): Promise<void> => {
	const shouldLogOut = await isAuthenticated()
	if (!shouldLogOut) return
	await _auth.signOut()
}

const onSessionChange = (callback: (user: User | null) => void) => {
	return onAuthStateChanged(_auth, callback)
}

export const authService = { isAuthenticated, logIn, logOut, onSessionChange }
