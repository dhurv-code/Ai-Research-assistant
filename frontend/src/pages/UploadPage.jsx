import { useEffect, useState } from 'react'
import { CloudUpload } from 'lucide-react'
import UploadDropzone from '../components/UploadDropzone'
import StatsCard from '../components/StatsCard'
import { fetchPapers, uploadPaper } from '../services/api'
import { formatCount } from '../utils/format'

export default function UploadPage() {
  const [recent, setRecent] = useState([])
  const [progress, setProgress] = useState(null)
  const [status, setStatus] = useState('Ready to upload')

  useEffect(() => {
    fetchPapers().then(setRecent)
  }, [])

  async function handleFileSelect(file) {
    if (!file) return
    setStatus('Uploading...')
    setProgress(0)
    const response = await uploadPaper(file, (event) => {
      setProgress(Math.round((event.loaded / event.total) * 100))
    })
    if (response?.error) {
      setStatus('Upload failed — try again')
      return
    }
    setStatus('Upload complete')
    setRecent((current) => [response, ...current].slice(0, 4))
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
          <div className="flex items-center gap-4 text-sky-300">
            <CloudUpload className="h-6 w-6" />
            <p className="text-xs uppercase tracking-[0.35em]">Upload Paper</p>
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-white">Instant paper ingestion</h2>
          <p className="mt-4 text-slate-400">Upload your PDF and let the platform index it for summaries, searching, and chat-based research.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <StatsCard title="Uploaded papers" value={formatCount(recent.length)} description="Recently imported files." />
            <StatsCard title="Processing" value={progress ? `${progress}%` : 'Ready'} description="Upload progress and status." />
          </div>
        </div>
        <UploadDropzone onFileSelect={handleFileSelect} isDragging={false} progress={progress} status={status} />
      </section>
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <h3 className="text-xl font-semibold text-white">Recently uploaded</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {recent.slice(0, 4).map((paper, index) => (
            <div key={paper.id || `${paper.title}-${index}`} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-slate-300">
              <h4 className="font-semibold text-white">{paper.title}</h4>
              <p className="mt-2 text-sm text-slate-400">{paper.topic || 'Research Automation'}</p>
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-500">
                <span>{paper.source || 'PDF'}</span>
                <span>{paper.published || 'Just now'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
