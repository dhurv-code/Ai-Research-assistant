import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import ChatBubble from '../components/ChatBubble'
import { fetchPapers, sendChatMessage } from '../services/api'
import LoadingState from '../components/LoadingState'

export default function ChatPage() {
  const [papers, setPapers] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPapers().then((result) => {
      setPapers(result)
      setSelectedId(result?.[0]?._id || '')
    })
  }, [])

  async function handleSend() {
    if (!prompt || !selectedId) return
    const userMessage = { id: `${Date.now()}-user`, role: 'user', text: prompt }
    setMessages((current) => [...current, userMessage])
    setPrompt('')
    setLoading(true)
    const response = await sendChatMessage({ question: prompt, paperId: selectedId })
    const botMessage = {
      id: `${Date.now()}-assistant`,
      role: 'assistant',
      text: response.answer || response.reply || response.message || 'Unable to generate a response.',
    }
    setMessages((current) => [...current, botMessage])
    setLoading(false)
  }

  const selectedPaper = papers.find((paper) => paper._id === selectedId)

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Research chat</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Ask questions and explore papers.</h2>
          </div>
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="max-w-xs rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-inner outline-none transition focus:border-sky-400"
          >
            {papers.map((paper) => (
              <option key={paper._id} value={paper._id}>{paper.title}</option>
            ))}
          </select>
        </div>
        {selectedPaper && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-slate-200">
            <p className="text-sm text-slate-400">Active paper</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{selectedPaper.title || selectedPaper.filename}</h3>
            <p className="mt-2 text-sm text-slate-400">{selectedPaper.summary || selectedPaper.abstract || selectedPaper.filename}</p>
          </div>
        )}
      </section>
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-soft backdrop-blur-xl">
        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <ChatBubble key={message.id || index} message={message.text} role={message.role} />
            ))}
            {loading && <LoadingState label="Thinking through your research question..." />}
          </div>
          <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <textarea
              rows={3}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="min-h-[120px] resize-none rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-100 outline-none focus:border-sky-400"
              placeholder="Ask a question about the selected paper..."
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!prompt || loading}
              className="inline-flex items-center justify-center rounded-3xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Ask AI
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
