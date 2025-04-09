import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAgjIFxEAUHQDgkKBzPIBH2iHy_ZPecs7Y',
  authDomain: 'meuprojeto-bc5d9.firebaseapp.com',
  projectId: 'meuprojeto-bc5d9',
  storageBucket: 'meuprojeto-bc5d9.firebasestorage.app',
  messagingSenderId: '463966629960',
  appId: '1:463966629960:web:2de73edea7db03210ba87d'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
