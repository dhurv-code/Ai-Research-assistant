import { useEffect, useState } from 'react'
import { Sparkles, TrendingUp, Bookmark, Clock3 } from 'lucide-react'
import StatsCard from '../components/StatsCard'
import ActivityFeedItem from '../components/ActivityFeedItem'
import PaperCard from '../components/PaperCard'
import { fetchDashboardStats, fetchPapers, fetchActivityFeed, fetchTrendingTopics } from '../services/api'

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
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Overview</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Research mission pulse</h2>
            <p className="mt-4 text-slate-400">Track discovery, summaries, and research questions in one modern workspace.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <StatsCard title="Papers discovered" value={stats.papers ?? 0} description="Total research papers surfaced." icon={<Bookmark />} />
            <StatsCard title="Summaries" value={stats.summaries ?? 0} description="AI-generated summaries ready." icon={<TrendingUp />} />
            <StatsCard title="Uploaded" value={stats.uploads ?? 0} description="Documents added to your library." icon={<Sparkles />} />
            <StatsCard title="Questions" value={stats.questions ?? 0} description="Research prompts answered." icon={<Clock3 />} />
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Active topics</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Trending research themes</h3>
              </div>
              <Sparkles className="h-6 w-6 text-sky-300" />
            </div>
            <div className="mt-6 grid gap-3">
              {topics.slice(0, 6).map((topic) => (
                <span key={topic} className="inline-flex rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">AI activity</p>
            <div className="mt-6 space-y-4">
              {feed.map((item) => (
                <ActivityFeedItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Recently discovered</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">New paper insights</h3>
          </div>
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          {papers.slice(0, 3).map((paper) => (
            <PaperCard key={paper.id || paper.title} paper={paper} />
          ))}
        </div>
      </section>
    </div>
  )
}
