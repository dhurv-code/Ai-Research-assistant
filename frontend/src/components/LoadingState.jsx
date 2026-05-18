export default function LoadingState({ label = 'Loading content...' }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center text-slate-400 shadow-soft">
      <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-sky-400/20" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
