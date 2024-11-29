// Import the functions you need from the SDKs you need
import { getFirestore, initializeFirestore } from '@firebase/firestore'
import { getApps, initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDvQgo_f4ZudspDLki3TjmLZhnnZBykd7k',
  authDomain: 'aleimports-f7ce0.firebaseapp.com',
  projectId: 'aleimports-f7ce0',
  storageBucket: 'aleimports-f7ce0.firebasestorage.app',
  messagingSenderId: '853302502092',
  appId: '1:853302502092:web:5f210e366fa1435ecc5869',
}

// Initialize Firebase
const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig)

initializeFirestore(app, {
  ignoreUndefinedProperties: true,
})

export const firestore = getFirestore(app)
