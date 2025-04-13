"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db, googleProvider, facebookProvider, githubProvider } from "@/lib/firebase"

type UserRole = "candidate" | "employer" | null

interface AuthContextType {
  user: User | null
  userRole: UserRole
  loading: boolean
  signUp: (email: string, password: string, role: UserRole, displayName?: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: (role: UserRole) => Promise<void>
  signInWithFacebook: (role: UserRole) => Promise<void>
  signInWithGithub: (role: UserRole) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Get user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role as UserRole)
        }
      } else {
        setUserRole(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const createUserDocument = async (user: User, role: UserRole, additionalData = {}) => {
    if (!user) return

    const userRef = doc(db, "users", user.uid)
    const snapshot = await getDoc(userRef)

    if (!snapshot.exists()) {
      try {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role,
          createdAt: serverTimestamp(),
          ...additionalData,
        })
      } catch (error) {
        console.error("Error creating user document", error)
      }
    }
  }

  const signUp = async (email: string, password: string, role: UserRole, displayName?: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      if (displayName) {
        await updateProfile(user, { displayName })
      }

      await createUserDocument(user, role)
      setUserRole(role)
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const signInWithProvider = async (provider: any, role: UserRole) => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if this is a new user
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (!userDoc.exists()) {
        await createUserDocument(user, role)
      }

      setUserRole(role)
    } catch (error) {
      console.error("Error signing in with provider:", error)
      throw error
    }
  }

  const signInWithGoogle = (role: UserRole) => signInWithProvider(googleProvider, role)
  const signInWithFacebook = (role: UserRole) => signInWithProvider(facebookProvider, role)
  const signInWithGithub = (role: UserRole) => signInWithProvider(githubProvider, role)

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  const value = {
    user,
    userRole,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
