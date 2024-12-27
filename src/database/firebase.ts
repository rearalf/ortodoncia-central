import { getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

if (
	!import.meta.env.VITE_APIKEY ||
	!import.meta.env.VITE_AUTHDOMAIN ||
	!import.meta.env.VITE_PROJECTID ||
	!import.meta.env.VITE_STORAGEBUCKET ||
	!import.meta.env.VITE_MESSAGINGSENDERID ||
	!import.meta.env.VITE_APPID
) {
	console.log('Missing firebase config values')
}

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_APPID,
}

export const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const db = getFirestore(firebase_app)

export const storage = getStorage(firebase_app)

export const auth = getAuth(firebase_app)
