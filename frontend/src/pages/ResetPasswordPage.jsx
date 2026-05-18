import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ResetPasswordPage() {
  const { resetPassword, status, error } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tokenFromUrl = searchParams.get('token') || ''
  const [token, setToken] = useState(tokenFromUrl)
  const [newPassword, setNewPassword] = useState('')
  const [completed, setCompleted] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await resetPassword(token, newPassword)
    if (result?.status) {
      setCompleted(true)
      setTimeout(() => navigate('/login'), 1200)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft backdrop-blur-xl">
      <h1 className="text-3xl font-semibold text-white">Reset your password</h1>
      <p className="mt-3 text-slate-400">Enter the reset token and create a new password.</p>
      {completed ? (
        <div className="mt-8 rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-200">
          <p>Password reset successfully. Redirecting to login…</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label className="block text-sm font-medium text-slate-300">
            Reset token
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-sky-400"
              required
            />
          </label>
          <label className="block text-sm font-medium text-slate-300">
            New password
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-sky-400"
              required
            />
          </label>
          {error && <p className="text-sm text-rose-400">{typeof error === 'string' ? error : 'Unable to reset password'}</p>}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-3xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:opacity-50"
          >
            {status === 'loading' ? 'Resetting...' : 'Reset password'}
          </button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-slate-400">
        Back to{' '}
        <Link to="/login" className="font-semibold text-white underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
