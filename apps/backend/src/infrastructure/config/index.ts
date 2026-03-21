import dotenv from 'dotenv'
dotenv.config({ quiet: true })

export const config = {
	server: {
		port: process.env.APP_PORT!,
		logLevel: process.env.APP_LOG_LEVEL! as any,
	},
	firebase: {
		projectId: process.env.APP_FIREBASE_PROJECT_ID!,
		clientEmail: process.env.APP_FIREBASE_CLIENT_EMAIL!,
		privateKey: process.env.APP_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
		databaseId: process.env.APP_FIREBASE_FIRESTORE_DATABASE_ID!,
	},
}
