import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Bookmark, ArrowRight } from 'lucide-react'
import { fetchPaperById } from '../services/api'
import StatusPill from '../components/StatusPill'

export default function PaperDetailPage() {
  const { id } = useParams()
  const [paper, setPaper] = useState(null)

  useEffect(() => {
    fetchPaperById(id).then(setPaper)
  }, [id])

  if (!paper) {
    return <p className="text-slate-300">Loading paper details...</p>
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Paper detail</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{paper.title}</h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
              <span>{paper.topic || 'Research'}</span>
              <span>{paper.source || 'arXiv'}</span>
              <span>{paper.published || '2026'}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <StatusPill label="Summarized" variant="success" />
            <StatusPill label="Available" />
          </div>
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
          <div className="flex items-center gap-3 text-slate-400">
            <Bookmark className="h-5 w-5 text-sky-300" />
            <span className="uppercase tracking-[0.28em]">AI summary</span>
          </div>
          <p className="mt-6 text-lg text-slate-100">{paper.summary || 'A synthesized summary is available for this paper.'}</p>
          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-slate-200">
            <h3 className="text-xl font-semibold text-white">Abstract</h3>
            <p className="mt-4 leading-7 text-slate-400">{paper.abstract || 'The paper abstract is unavailable for this record.'}</p>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Paper actions</p>
            <div className="mt-6 space-y-4">
              <a
                href={paper.pdf_link || '#'}
                target="_blank"
                rel="noreferrer"
                className="block rounded-3xl bg-sky-400/10 px-5 py-4 text-sm text-sky-200 transition hover:bg-sky-400/20"
              >
                Download PDF
              </a>
              <Link
                to="/chat"
                className="block rounded-3xl bg-white/5 px-5 py-4 text-sm text-slate-100 transition hover:bg-white/10"
              >
                Ask AI about this paper
                <ArrowRight className="ml-2 inline h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Authors</p>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              {(paper.authors || ['Unknown']).map((author) => (
                <p key={author}>{author}</p>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
