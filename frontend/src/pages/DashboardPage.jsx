import { useEffect, useState } from 'react'
import {
  Sparkles,
  TrendingUp,
  Bookmark,
  Clock3,
  Search,
  ArrowRight,
  FileText,
  Upload,
  MessageSquare,
} from 'lucide-react'

import StatsCard from '../components/StatsCard'
import ActivityFeedItem from '../components/ActivityFeedItem'
import PaperCard from '../components/PaperCard'
import {
  fetchDashboardStats,
  fetchPapers,
  fetchActivityFeed,
  fetchTrendingTopics,
} from '../services/api'

export default function DashboardPage() {
  const [stats, setStats] = useState({})
  const [papers, setPapers] = useState([])
  const [feed, setFeed] = useState([])
  const [topics, setTopics] = useState([])

  useEffect(() => {
    fetchDashboardStats().then(setStats)
    fetchPapers().then(setPapers)
    fetchActivityFeed().then(setFeed)
    fetchTrendingTopics().then(setTopics)
  }, [])

  return (
    <div className="space-y-6">

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      


      {/* ====================================================== */}
      {/* KEY METRICS */}
      {/* ====================================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Papers discovered"
          value={stats.papers ?? 0}
          description="Research papers surfaced"
          icon={<Bookmark />}
        />

        <StatsCard
          title="AI summaries"
          value={stats.summaries ?? 0}
          description="Summaries generated"
          icon={<TrendingUp />}
        />

        <StatsCard
          title="Uploaded"
          value={stats.uploads ?? 0}
          description="Documents in your library"
          icon={<Upload />}
        />

        <StatsCard
          title="Questions"
          value={stats.questions ?? 0}
          description="Research questions answered"
          icon={<MessageSquare />}
        />

      </section>


      {/* ====================================================== */}
      {/* MAIN CONTENT */}
      {/* ====================================================== */}

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.7fr)]">

        {/* ---------------------------------------------------- */}
        {/* RECENT PAPERS */}
        {/* ---------------------------------------------------- */}

        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 shadow-soft backdrop-blur-xl">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-300/80">
                Recently discovered
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                New paper insights
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Papers recently added to your research feed.
              </p>
            </div>

            <button
              type="button"
              className="hidden items-center gap-1.5 text-sm font-medium text-sky-300 transition hover:text-sky-200 sm:flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>


          <div className="mt-6 grid gap-4">

            {papers.length > 0 ? (
              papers.slice(0, 3).map((paper) => (
                <div
                  key={paper.id || paper.title}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-1 transition hover:border-sky-400/20 hover:bg-white/[0.04]"
                >
                  <PaperCard paper={paper} />
                </div>
              ))
            ) : (
              <EmptyState
                icon={FileText}
                title="No papers discovered yet"
                description="Discover research papers to start building your library."
              />
            )}

          </div>

        </div>


        {/* ---------------------------------------------------- */}
        {/* RIGHT COLUMN */}
        {/* ---------------------------------------------------- */}

        <div className="space-y-6">

          {/* ACTIVE TOPICS */}

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 shadow-soft backdrop-blur-xl">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-300/80">
                  Active topics
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white">
                  Research themes
                </h2>
              </div>

              <Sparkles className="h-5 w-5 text-sky-300" />

            </div>


            <div className="mt-5 flex flex-wrap gap-2">

              {topics.slice(0, 6).map((topic) => (
                <span
                  key={topic}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-sky-400/20 hover:bg-sky-400/[0.06] hover:text-sky-200"
                >
                  {topic}
                </span>
              ))}

            </div>

          </div>


          

        </div>

      </section>


      {/* ====================================================== */}
      {/* RESEARCH QUICK ACTIONS */}
      {/* ====================================================== */}

      

    </div>
  )
}


/* ============================================================ */
/* EMPTY STATE */
/* ============================================================ */

function EmptyState({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.015] px-6 text-center">

      <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-400/[0.07] text-sky-300">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-4 font-medium text-white">
        {title}
      </p>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {description}
      </p>

    </div>
  )
}


/* ============================================================ */
/* QUICK ACTION */
/* ============================================================ */

function QuickAction({
  icon: Icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/20 hover:bg-slate-900/70"
    >

      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-400/[0.07] text-sky-300 transition group-hover:bg-sky-400/[0.12]">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">

        <p className="font-semibold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-700 transition group-hover:translate-x-1 group-hover:text-sky-400" />

    </button>
  )
}