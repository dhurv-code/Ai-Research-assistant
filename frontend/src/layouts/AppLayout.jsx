import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ThemeToggle from '../components/ThemeToggle'
import { Search } from 'lucide-react'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/discover': 'Discover Papers',
  '/upload': 'Upload Paper',
  '/chat': 'Research Chat',
  '/topics': 'Topics',
  '/history': 'History',
  '/settings': 'Settings',
}

export default function AppLayout() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Research Assistant'

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.14),transparent_25%)] px-6 py-6 text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1600px] gap-8 xl:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-8">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-950/70 px-6 py-5 shadow-soft backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-sky-300/80">Continue research</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-300 sm:flex">
                <Search className="h-4 w-4" />
                <span>Quick search</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
