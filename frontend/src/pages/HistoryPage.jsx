import { useEffect, useState } from 'react'
import { fetchHistory } from '../services/api'

export default function HistoryPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchHistory().then(setEvents)
  }, [])

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Research history</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Previous workflow sessions</h2>
        <p className="mt-4 text-slate-400">Review the actions, paper discoveries, and summaries generated during your research sessions.</p>
      </section>
      <div className="grid gap-6 md:grid-cols-2">
        {events.map((item) => (
          <article key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
              <span>{item.type}</span>
              <span>{new Date(item.timestamp).toLocaleDateString()}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.note}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
