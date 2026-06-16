import { useEffect, useMemo, useState } from 'react'
import { fetchDiscoverPapers } from '../services/api'
import SearchBar from '../components/SearchBar'
import TopicChip from '../components/TopicChip'
import PaperCard from '../components/PaperCard'
import LoadingState from '../components/LoadingState'

export default function DiscoverPage() {
  const [papers, setPapers] = useState([])
  const [query, setQuery] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDiscoverPapers().then((result) => {
      setPapers(Array.isArray(result) ? result : [])
      setLoading(false)
    })
  }, [])

  const topics = useMemo(() => {
    const all = new Set(papers.map((paper) => paper.topic || 'Research'))
    return ['All', ...Array.from(all)]
  }, [papers])

  const results = useMemo(() => {
    return papers.filter((paper) => {
      const matchTopic = selectedTopic === 'All' || paper.topic === selectedTopic
      const matchQuery = [paper.title, paper.summary, paper.abstract, paper.topic]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase())
      return matchTopic && matchQuery
    })
  }, [papers, query, selectedTopic])

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Discover</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">New papers from arXiv</h2>
        <p className="mt-4 text-slate-400">Browse the latest research and filter by topic to find the most relevant studies.</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <SearchBar value={query} onChange={setQuery} />
          <div className="flex flex-wrap gap-3">
            {topics.map((topic) => (
              <TopicChip
                key={topic}
                label={topic}
                active={topic === selectedTopic}
                onClick={() => setSelectedTopic(topic)}
              />
            ))}
          </div>
        </div>
      </section>
      {loading ? (
        <LoadingState label="Loading discovered papers..." />
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {results.map((paper) => (
            <PaperCard key={paper.id || paper.title} paper={paper} />
          ))}
          {results.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-10 text-center text-slate-400">
              <p className="text-lg font-medium text-white">No papers match your search.</p>
              <p className="mt-3">Try adjusting the topic filter or search terms.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}