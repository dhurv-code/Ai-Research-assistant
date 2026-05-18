import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ForgotPasswordPage() {
  const { forgotPassword, status, error } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await forgotPassword(email)
    if (result?.status) {
      setSent(true)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft backdrop-blur-xl">
      <h1 className="text-3xl font-semibold text-white">Forgot your password?</h1>
      <p className="mt-3 text-slate-400">Enter your email to receive a reset link.</p>
      {sent ? (
        <div className="mt-8 rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-200">
          <p>Check your email for a reset link. The token is valid for 15 minutes.</p>
          <p className="mt-4 text-slate-400">If you don’t see it, check your spam folder.</p>
          <Link to="/login" className="mt-4 inline-flex rounded-3xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-300">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label className="block text-sm font-medium text-slate-300">
            Email
            <input
              type="email"
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-sky-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {error && <p className="text-sm text-rose-400">{typeof error === 'string' ? error : 'Unable to send reset link'}</p>}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-3xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-slate-400">
        Remembered your password?{' '}
        <Link to="/login" className="font-semibold text-white underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
