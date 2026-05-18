import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'
import authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'))
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      localStorage.setItem('authToken', token)
    } else {
      delete api.defaults.headers.common.Authorization
      localStorage.removeItem('authToken')
    }
  }, [token])

  const signup = async (name, email, password) => {
    setStatus('loading')
    setError(null)
    const result = await authService.signup(name, email, password)
    if (result?.access_token) {
      setToken(result.access_token)
      setStatus('success')
      return result
    }
    setStatus('error')
    setError(result.error || 'Signup failed')
    return result
  }

  const login = async (email, password) => {
    setStatus('loading')
    setError(null)
    const result = await authService.login(email, password)
    if (result?.access_token) {
      setToken(result.access_token)
      setStatus('success')
      return result
    }
    setStatus('error')
    setError(result.error || 'Login failed')
    return result
  }

  const logout = () => {
    setToken(null)
    setStatus('idle')
    setError(null)
  }

  const forgotPassword = async (email) => {
    setStatus('loading')
    setError(null)
    const result = await authService.forgotPassword(email)
    if (result?.status) {
      setStatus('success')
      return result
    }
    setStatus('error')
    setError(result.error || 'Request failed')
    return result
  }

  const resetPassword = async (tokenValue, newPassword) => {
    setStatus('loading')
    setError(null)
    const result = await authService.resetPassword(tokenValue, newPassword)
    if (result?.status) {
      setStatus('success')
      return result
    }
    setStatus('error')
    setError(result.error || 'Reset failed')
    return result
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: Boolean(token),
        status,
        error,
        signup,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
