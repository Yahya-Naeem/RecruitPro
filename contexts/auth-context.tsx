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

  console.log("AuthProvider component rendered"); // Check when the provider renders

  useEffect(() => {
    console.log("AuthProvider useEffect triggered"); // Check when the effect runs

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("onAuthStateChanged triggered with user:", user);

      setUser(user)

      if (user) {
        console.log("User is authenticated, fetching user role...");
        // Get user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          const role = userDoc.data().role as UserRole;
          setUserRole(role);
          console.log("User role fetched:", role);
        } else {
          setUserRole(null); // Or handle this case differently if needed
          console.log("User document does not exist in Firestore.");
        }
      } else {
        setUserRole(null)
        console.log("User is not authenticated, userRole set to null.");
      }

      setLoading(false)
      console.log("Loading state set to false.");
    })

    return () => {
      unsubscribe();
      console.log("AuthProvider useEffect cleanup: onAuthStateChanged listener unsubscribed.");
    };
  }, [])

  const createUserDocument = async (user: User, role: UserRole, additionalData = {}) => {
    if (!user) {
      console.log("createUserDocument called with no user.");
      return;
    }

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
        console.log("User document created in Firestore for UID:", user.uid, "with role:", role);
      } catch (error) {
        console.error("Error creating user document", error)
      }
    } else {
      console.log("User document already exists for UID:", user.uid);
    }
  }

  const signUp = async (email: string, password: string, role: UserRole, displayName?: string) => {
    console.log("signUp called with email:", email, "role:", role, "displayName:", displayName);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      if (displayName) {
        await updateProfile(user, { displayName })
        console.log("User profile updated with displayName:", displayName);
      }

      await createUserDocument(user, role)
      setUserRole(role)
      console.log("signUp successful, user:", user);
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    console.log("signIn called with email:", email);
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log("signIn successful for email:", email);
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const signInWithProvider = async (provider: any, role: UserRole) => {
    console.log("signInWithProvider called with provider:", provider.providerId, "role:", role);
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if this is a new user
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (!userDoc.exists()) {
        await createUserDocument(user, role)
      }
      setUserRole(role)
      console.log("signInWithProvider successful, user:", user);
    } catch (error) {
      console.error("Error signing in with provider:", error)
      throw error
    }
  }

  const signInWithGoogle = (role: UserRole) => {
    console.log("signInWithGoogle called with role:", role);
    return signInWithProvider(googleProvider, role);
  }

  const signInWithFacebook = (role: UserRole) => {
    console.log("signInWithFacebook called with role:", role);
    return signInWithProvider(facebookProvider, role);
  }

  const signInWithGithub = (role: UserRole) => {
    console.log("signInWithGithub called with role:", role);
    return signInWithProvider(githubProvider, role);
  }

  const logout = async () => {
    console.log("logout called");
    try {
      await signOut(auth)
      console.log("Logout successful.");
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