import firebase from 'firebase/compat/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_APIKEY,
	authDomain: process.env.NEXT_PUBLIC_AUTHdOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECTID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGEbUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
	appId: process.env.NEXT_PUBLIC_APPID,
}

/* if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
} */

export const firestore = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig).firestore
	: firebase.app().firestore
