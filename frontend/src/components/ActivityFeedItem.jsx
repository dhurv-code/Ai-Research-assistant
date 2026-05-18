export default function ActivityFeedItem({ item }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-slate-300 shadow-soft">
      <p className="font-medium text-white">{item.title}</p>
      <p className="mt-2 text-sm text-slate-400">{item.time}</p>
    </div>
  )
}
