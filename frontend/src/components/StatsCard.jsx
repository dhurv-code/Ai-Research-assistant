export default function StatsCard({ title, value, description, icon, accent }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:border-sky-400/30">
      <div className="flex items-center justify-between gap-4">
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-xl ${accent || 'text-sky-300'}`}>
          {icon}
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{title}</span>
      </div>
      <div className="mt-6">
        <p className="text-4xl font-semibold tracking-tight text-white">{value}</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      </div>
    </div>
  )
}
