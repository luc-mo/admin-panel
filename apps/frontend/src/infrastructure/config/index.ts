export const config = {
	app: {
		apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
	},
	firebase: {
		projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
		appId: import.meta.env.VITE_FIREBASE_APP_ID,
		apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	},
}
