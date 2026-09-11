import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  
  Search,
  BookOpen,
  
  ArrowRight,
  BrainCircuit,
  
  MessageSquareText,
} from 'lucide-react'

export default function LandingPage() {
  const steps = [
    {
      title: 'Pick topics',
      icon: Search,
      description: 'Select the research areas you want to follow.',
    },
    {
      title: 'Discover papers',
      icon: BookOpen,
      description: 'Find new papers from arXiv and related sources.',
    },
    {
      title: 'Auto summarize',
      icon: Sparkles,
      description: 'Get instant AI summaries of every paper.',
    },
    {
      title: 'Ask questions',
      icon: MessageSquareText,
      description: 'Chat with your research content using RAG.',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-slate-100">

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-15%] h-[600px] w-[600px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[30%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      {/* Main container */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-0 sm:px-10 lg:px-14">

        <div className="grid w-full gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">

          {/* ========================================================= */}
          {/* LEFT SIDE */}
          {/* ========================================================= */}

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[0.06] px-4 py-1 text-xs uppercase tracking-[0.3em] text-sky-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI Research Assistant
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.3rem]">
              Research
              <span className="block bg-gradient-to-r from-sky-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                smarter, not harder.
              </span>
            </h1>

            {/* Buttons */}
            <div className="mt-9 flex items-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-400 px-7 py-4 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-300"
              >
                Start researching
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-sky-400/30 hover:bg-white/[0.07]"
              >
                Sign in
              </Link>
            </div>
          </motion.div>


          {/* ========================================================= */}
          {/* RIGHT SIDE */}
          {/* ========================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >

            {/* Glow behind card */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-sky-500/[0.04] blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">

              {/* Card background */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.13),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.10),transparent_35%)]" />

              <div className="relative">

                {/* Card header */}
                <div className="mb-8">

                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-300/80">
                      Research automation
                    </p>
                  </div>

                  <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    From a research idea
                    <span className="text-sky-300"> to insights.</span>
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Let AI handle the repetitive parts of research while you
                    focus on understanding and creating.
                  </p>

                </div>


                {/* Steps */}
                <div className="space-y-3">

                  {steps.map((step, index) => {
                    const Icon = step.icon

                    return (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.35 + index * 0.1,
                          duration: 0.4,
                        }}
                        className="group rounded-2xl border border-white/[0.04] bg-slate-950/70 p-4 transition-all duration-300 hover:border-sky-400/20 hover:bg-slate-950"
                      >

                        <div className="flex items-center gap-4">

                          {/* Number + icon */}
                          <div className="relative shrink-0">

                            <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-400/[0.08] text-sky-300 transition-all duration-300 group-hover:bg-sky-400/[0.14]">
                              <Icon className="h-5 w-5" />
                            </div>

                            {index < steps.length - 1 && (
                              <div className="absolute left-1/2 top-[3.1rem] h-3 w-px -translate-x-1/2 bg-white/[0.06]" />
                            )}

                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-white">
                              {step.title}
                            </p>

                            <p className="mt-0.5 text-sm leading-5 text-slate-500">
                              {step.description}
                            </p>
                          </div>

                          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-sky-400" />

                        </div>

                      </motion.div>
                    )
                  })}

                </div>


                {/* Bottom AI indicator */}
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-sky-400/10 bg-sky-400/[0.04] px-4 py-3">

                  <div className="flex items-center gap-3">

                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-sky-400/10">
                      <BrainCircuit className="h-4 w-4 text-sky-300" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-300">
                        AI research engine
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Ready to analyze your research
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400 [animation-delay:300ms]" />
                  </div>

                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}


/* ========================================================= */
/* Small reusable components */
/* ========================================================= */

// function WorkflowItem({ icon: Icon, text, active = false }) {
//   return (
//     <div
//       className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${active
//           ? 'border-sky-400/20 bg-sky-400/[0.07] text-sky-200'
//           : 'border-white/[0.07] bg-white/[0.025] text-slate-400'
//         }`}
//     >
//       <Icon className="h-3.5 w-3.5" />
//       <span className="text-xs font-medium">{text}</span>
//     </div>
//   )
// }

// function WorkflowArrow() {
//   return (
//     <ArrowRight className="hidden h-3.5 w-3.5 text-slate-700 sm:block" />
//   )
// }