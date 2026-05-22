"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "maestro_auth_user"

export type MaestroAuthUser = {
  id: number
  email: string
  username: string
  nickname: string
  role: string
}

const AUTH_CHANGE_EVENT = "maestro-auth-change"

function dispatchAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
  }
}

export function getAuthUser(): MaestroAuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as MaestroAuthUser
    if (
      typeof parsed.id === "number" &&
      typeof parsed.email === "string" &&
      typeof parsed.username === "string"
    ) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

export function setAuthUser(user: MaestroAuthUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  dispatchAuthChange()
}

export function clearAuthUser(): void {
  localStorage.removeItem(STORAGE_KEY)
  dispatchAuthChange()
}

export function useAuthSession() {
  const [user, setUser] = useState<MaestroAuthUser | null>(null)

  const refresh = useCallback(() => {
    setUser(getAuthUser())
  }, [])

  useEffect(() => {
    refresh()
    const onAuthChange = () => refresh()
    window.addEventListener(AUTH_CHANGE_EVENT, onAuthChange)
    window.addEventListener("storage", onAuthChange)
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, onAuthChange)
      window.removeEventListener("storage", onAuthChange)
    }
  }, [refresh])

  return { user, isLoggedIn: user !== null }
}
