import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Rocket, Search, BookOpen, Activity } from 'lucide-react'

export default function LandingPage() {
  const steps = [
    { title: 'Pick topics', icon: Search, description: 'Select the research areas you want to follow.' },
    { title: 'Discover papers', icon: BookOpen, description: 'Find new papers from arXiv and related sources.' },
    { title: 'Auto summarize', icon: Sparkles, description: 'Get instant AI summaries of every paper.' },
    { title: 'Ask questions', icon: Activity, description: 'Chat with your research content with RAG support.' },
  ]

  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sky-500/30 to-transparent blur-3xl" />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-sky-200">
              <Sparkles className="h-4 w-4" /> AI Research Assistant
            </p>
            <h1 className="mt-8 max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Discover academic research faster with AI-powered summarization and automation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Build a research workflow for topic discovery, paper summarization, document uploads, and interactive question answering.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-3xl bg-sky-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:border-sky-400/40 hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/discover"
                className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:border-sky-400/40 hover:bg-white/10"
              >
                Discover papers
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-3xl bg-slate-900/80 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Go to dashboard
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60 p-10 shadow-soft backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),transparent_28%)]" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">Research automation</p>
                <h2 className="text-3xl font-semibold text-white">Automate your workflow at every step.</h2>
                <p className="text-slate-300">Bring structure to research: topics, discovery, summaries, and deep paper conversations in one place.</p>
              </div>
              <div className="space-y-4">
                {steps.map((step) => {
                  const Icon = step.icon
                  return (
                    <div key={step.title} className="rounded-3xl bg-slate-950/80 p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)]">
                      <div className="flex items-center gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-3xl bg-sky-400/10 text-sky-200">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold text-white">{step.title}</p>
                          <p className="mt-1 text-sm text-slate-400">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
