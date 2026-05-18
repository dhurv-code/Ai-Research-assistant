export default function TopicChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? 'border-sky-300 bg-sky-400/10 text-sky-200 shadow-[0_0_0_1px_rgba(56,189,248,0.35)]'
          : 'border-white/10 bg-white/5 text-slate-300 hover:border-slate-300/60 hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  )
}
