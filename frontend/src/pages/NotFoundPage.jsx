import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/70 p-10 text-center shadow-soft backdrop-blur-xl">
      <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">Page not found</p>
      <h1 className="mt-6 text-5xl font-semibold text-white">404</h1>
      <p className="mt-4 text-slate-400">We couldn’t find the page you were looking for. Head back to the dashboard to continue your research.</p>
      <Link
        to="/dashboard"
        className="mt-8 inline-flex rounded-3xl bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
      >
        Return home
      </Link>
    </div>
  )
}
