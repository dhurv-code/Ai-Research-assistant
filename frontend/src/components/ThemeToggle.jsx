import { Moon, SunMedium } from 'lucide-react'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { mode, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 text-slate-300 transition hover:border-sky-400/40 hover:text-white"
      aria-label="Toggle theme"
    >
      {mode === 'dark' ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
