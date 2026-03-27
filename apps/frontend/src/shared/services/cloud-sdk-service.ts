import { initializeApp } from 'firebase/app'
import { config } from '@/shared/config'

export const cloudSdkService = initializeApp({
	projectId: config.firebase.projectId,
	appId: config.firebase.appId,
	apiKey: config.firebase.apiKey,
})
