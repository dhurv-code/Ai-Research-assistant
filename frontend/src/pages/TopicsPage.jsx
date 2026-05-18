import { useEffect, useState } from 'react'
import { saveTopics, fetchTopics, fetchTrendingTopics } from '../services/api'
import TopicChip from '../components/TopicChip'

export default function TopicsPage() {
  const [currentTopics, setCurrentTopics] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchTopics().then(setCurrentTopics)
    fetchTrendingTopics().then(setSuggestions)
  }, [])

  function toggleTopic(topic) {
    setCurrentTopics((existing) =>
      existing.includes(topic)
        ? existing.filter((item) => item !== topic)
        : [...existing, topic],
    )
  }

  async function handleSave() {
    await saveTopics(currentTopics)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Topics</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Select the research fields you want to track.</h2>
        <p className="mt-4 text-slate-400">Add or remove topics and save your preferred research focus areas.</p>
        <div className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6">
          <h3 className="text-xl font-semibold text-white">Selected topics</h3>
          <div className="flex flex-wrap gap-3">
            {currentTopics.map((topic) => (
              <TopicChip key={topic} label={topic} active onClick={() => toggleTopic(topic)} />
            ))}
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="mt-4 rounded-3xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Save topics
          </button>
          {saved && <p className="mt-3 text-sm text-emerald-300">Your research interests were saved.</p>}
        </div>
      </section>
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Suggested</p>
          <span className="text-sm text-slate-400">Based on emerging research trends</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {suggestions.map((topic) => (
            <TopicChip
              key={topic}
              label={topic}
              active={currentTopics.includes(topic)}
              onClick={() => toggleTopic(topic)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
