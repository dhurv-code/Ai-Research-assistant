import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, status, error } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await login(email, password)
    if (result?.access_token) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-soft backdrop-blur-xl">
      <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
      <p className="mt-3 text-slate-400">Sign in to continue your research workflow.</p>
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
        <label className="block text-sm font-medium text-slate-300">
          Password
          <input
            type="password"
            className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-sky-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="text-sm text-rose-400">{typeof error === 'string' ? error : 'Unable to sign in'}</p>}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-3xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:opacity-50"
        >
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <div className="mt-6 flex flex-col gap-3 text-center text-sm text-slate-400">
        <Link to="/forgot-password" className="font-semibold text-white underline">
          Forgot password?
        </Link>
        <p>
          New here?{' '}
          <Link to="/signup" className="font-semibold text-white underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
