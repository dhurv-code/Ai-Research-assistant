import ThemeToggle from '../components/ThemeToggle'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.28em] text-sky-300/80">Settings</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Workspace preferences</h2>
        <p className="mt-4 text-slate-400">Choose a theme and configure your research assistant environment.</p>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">Theme mode</h3>
          <p className="mt-3 text-slate-400">Toggle between dark and light UI modes for the best reading experience.</p>
          <div className="mt-6 flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-900/70 px-5 py-4">
            <div>
              <p className="font-medium text-white">Current interface</p>
              <p className="text-sm text-slate-400">Adaptive dark mode across the application.</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">Research assistant</h3>
          <p className="mt-3 text-slate-400">Fine tune pipeline behavior and notification preferences for your research workflow.</p>
          <div className="mt-6 space-y-4 text-slate-300">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <p className="font-medium text-white">Paper discovery</p>
              <p className="mt-2 text-sm text-slate-400">Auto discover new academic papers based on your selected topics.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <p className="font-medium text-white">Summary generation</p>
              <p className="mt-2 text-sm text-slate-400">Instantly create executive summaries for your newest findings.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
