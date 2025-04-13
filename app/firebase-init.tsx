"use client"

import { useEffect } from "react"

export function FirebaseInit() {
  useEffect(() => {
    // Firebase is already initialized in the lib/firebase.ts file
    console.log("Firebase initialized")
  }, [])

  return null
}
