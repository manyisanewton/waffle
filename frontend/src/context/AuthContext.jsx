import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../lib/api'

const AuthContext = createContext(null)
const TOKEN_KEY = 'vortexus_admin_token'

function readStoredToken() {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(TOKEN_KEY) || ''
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readStoredToken)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(readStoredToken()))

  useEffect(() => {
    if (!token) {
      setUser(null)
      setIsLoading(false)
      return
    }

    let isMounted = true

    apiRequest('/auth/me', { token })
      .then((data) => {
        if (isMounted) {
          setUser(data.user)
        }
      })
      .catch(() => {
        if (isMounted) {
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem(TOKEN_KEY)
          }
          setToken('')
          setUser(null)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [token])

  const login = async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TOKEN_KEY, data.access_token)
    }
    setToken(data.access_token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN_KEY)
    }
    setToken('')
    setUser(null)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      logout,
    }),
    [token, user, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
