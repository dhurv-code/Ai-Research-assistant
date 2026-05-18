export default function StatusPill({ label, variant = 'primary' }) {
  const teams = {
    primary: 'bg-sky-400/10 text-sky-200',
    success: 'bg-emerald-400/10 text-emerald-300',
    muted: 'bg-white/5 text-slate-400',
  }
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${teams[variant] || teams.primary}`}>{label}</span>
}
