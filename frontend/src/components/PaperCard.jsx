import { BookOpen, ArrowRight, Layers } from 'lucide-react'
import { excerpt } from '../utils/format'
import { Link } from 'react-router-dom'

export default function PaperCard({ paper }) {
  return (
    <article className="group rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-soft transition hover:-translate-y-1 hover:border-sky-400/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.3em] text-sky-200/90">
            <Layers className="h-3.5 w-3.5" />
            {paper.topic || 'Research'}
          </p>
          <h3 className="mt-4 text-xl font-semibold text-white">{paper.title}</h3>
        </div>
        <div className="rounded-3xl bg-slate-900/70 p-3 text-slate-300">
          <BookOpen className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-400">{excerpt(paper.summary || paper.abstract || '', 160)}</p>
      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-300">
        <span>{paper.source || 'arXiv'}</span>
        <span>{paper.published || '2026'}</span>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <Link
          to={`/papers/${paper.id || paper.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-200 transition hover:bg-sky-400/20"
        >
          View details
          <ArrowRight className="h-4 w-4" />
        </Link>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">Ask AI</span>
      </div>
    </article>
  )
}
