import api from './api'

// Note: this file provides simple wrappers for the backend auth endpoints.
// The app's UI should call these and manage storing the returned token (e.g., in localStorage).

export async function signup(name, email, password) {
  try {
    const { data } = await api.post('/auth/signup', { name, email, password })
    return data
  } catch (err) {
    return { error: err?.response?.data || err.message }
  }
}

export async function login(email, password) {
  try {
    const { data } = await api.post('/auth/login', { email, password })
    return data
  } catch (err) {
    return { error: err?.response?.data || err.message }
  }
}

export async function forgotPassword(email) {
  try {
    const { data } = await api.post('/auth/forgot-password', { email })
    return data
  } catch (err) {
    return { error: err?.response?.data || err.message }
  }
}

export async function resetPassword(token, new_password) {
  try {
    const { data } = await api.post('/auth/reset-password', { token, new_password })
    return data
  } catch (err) {
    return { error: err?.response?.data || err.message }
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('authToken')
  window.location.href = '/login'
}

export default {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
}
