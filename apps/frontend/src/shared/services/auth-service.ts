import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { cloudSdkService } from './cloud-sdk-service'

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
	if (await isAuthenticated()) return
	await _auth.signOut()
}

export const authService = { isAuthenticated, logIn, logOut }
