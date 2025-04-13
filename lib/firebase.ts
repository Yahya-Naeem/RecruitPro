import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_6szsaDs6_uy4Hq6p6XaS0xUKPCuS1H4",
  authDomain: "recruitpro-7b5f8.firebaseapp.com",
  projectId: "recruitpro-7b5f8",
  storageBucket: "recruitpro-7b5f8.firebasestorage.app",
  messagingSenderId: "348530358097",
  appId: "1:348530358097:web:c1988b4925c5b296980570",
  measurementId: "G-SJLJ40HZ6K",
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

// Initialize Analytics (only in browser environment)
let analytics = null
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

// Auth providers
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const githubProvider = new GithubAuthProvider()

export { app, auth, db, storage, analytics, googleProvider, facebookProvider, githubProvider }
