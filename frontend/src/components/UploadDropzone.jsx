import { CloudUpload, FileText, Sparkles } from 'lucide-react'

export default function UploadDropzone({ onFileSelect, isDragging, progress, status }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-white/15 bg-slate-950/70 p-8 text-center text-slate-300 shadow-soft transition">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-sky-300">
        <CloudUpload className="h-7 w-7" />
      </div>
      <div className="mt-6 space-y-3">
        <p className="text-lg font-semibold text-white">Drag & drop PDF</p>
        <p className="text-sm text-slate-400">Upload academic papers and auto-index them for analysis.</p>
        <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full bg-sky-400/10 px-5 py-3 text-sm font-medium text-sky-200 transition hover:bg-sky-400/20">
          <span>Select file</span>
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(event) => onFileSelect(event.target.files?.[0] || null)}
          />
        </label>
      </div>
      <div className="mt-8 rounded-3xl bg-white/5 p-5 text-left text-sm text-slate-300">
        <div className="flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-sky-300" />
          <span>{status}</span>
        </div>
        {progress != null && (
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <div className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-500">
        <FileText className="h-4 w-4" />
        <span>Supported format: PDF only.</span>
      </div>
    </div>
  )
}
