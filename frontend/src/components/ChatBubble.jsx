import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { MessageCircle, Cpu } from 'lucide-react'

export default function ChatBubble({ message, role }) {
  const isAssistant = role === 'assistant'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`rounded-3xl p-5 shadow-soft ${
        isAssistant ? 'bg-slate-900 text-slate-100' : 'bg-white/5 text-slate-200 self-end'
      }`}
    >
      <div className="mb-3 flex items-center gap-3 text-sm text-slate-400">
        {isAssistant ? <Cpu className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        <span>{isAssistant ? 'AI Research Assistant' : 'You'}</span>
      </div>
      <div className="max-w-full text-sm leading-7 text-slate-200 whitespace-pre-wrap">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </motion.div>
  )
}
