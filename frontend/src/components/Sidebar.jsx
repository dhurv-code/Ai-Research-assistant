import { NavLink } from 'react-router-dom'
import {
  BookOpen,
  Briefcase,
  Cpu,
  FilePlus,
  LayoutGrid,
  Sparkles,
  Settings,
  Clock3,
} from 'lucide-react'

const links = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutGrid },
  { label: 'Discover Papers', to: '/discover', icon: BookOpen },
  { label: 'Upload Paper', to: '/upload', icon: FilePlus },
  { label: 'Chat', to: '/chat', icon: Cpu },
  { label: 'Topics', to: '/topics', icon: Sparkles },
  { label: 'History', to: '/history', icon: Clock3 },
  { label: 'Settings', to: '/settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-80 shrink-0 flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl lg:flex">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-300/80">Research Assist</p>
        <h2 className="text-2xl font-semibold text-white">Workspace</h2>
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-sky-400/15 text-sky-200 shadow-soft'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
      <div className="mt-auto rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-300">
        <p className="font-medium text-white">AI research automated</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">Create automatic paper discovery, summaries, and research conversations in one workspace.</p>
      </div>
    </aside>
  )
}
