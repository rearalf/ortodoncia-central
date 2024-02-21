import { getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

if (
	!process.env.NEXT_PUBLIC_APIKEY ||
	!process.env.NEXT_PUBLIC_AUTHDOMAIN ||
	!process.env.NEXT_PUBLIC_PROJECTID ||
	!process.env.NEXT_PUBLIC_STORAGEBUCKET ||
	!process.env.NEXT_PUBLIC_MESSAGINGSENDERID ||
	!process.env.NEXT_PUBLIC_APPID
) {
	throw new Error('Missing firebase config values')
}

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_APIKEY,
	authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECTID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
	appId: process.env.NEXT_PUBLIC_APPID,
}

export let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const db = getFirestore(firebase_app)
