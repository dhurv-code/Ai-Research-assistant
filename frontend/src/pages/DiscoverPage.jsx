import { useEffect, useState } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchDiscoverPapers } from '../services/api'
import PaperCard from '../components/PaperCard'
import LoadingState from '../components/LoadingState'

export default function DiscoverPage() {
  const [papers, setPapers] = useState([])
  const [query, setQuery] = useState('machine learning')
  const [input, setInput] = useState('machine learning')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadPapers = async (searchQuery, currentPage) => {
    setLoading(true)

    try {
      const result = await fetchDiscoverPapers({
        query: searchQuery,
        page: currentPage,
        limit: 20,
      })

      setPapers(result?.papers || [])
      setHasMore(Boolean(result?.has_more))
    } catch (error) {
      console.error('Failed to load papers:', error)
      setPapers([])
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPapers(query, page)
  }, [query, page])

  const handleSearch = (e) => {
    e.preventDefault()

    const cleaned = input.trim()

    if (!cleaned) return

    setPage(1)
    setQuery(cleaned)
  }

  return (
    <main className="relative w-full min-w-0 overflow-x-hidden">

      {/* ====================================================== */}
      {/* PAGE HEADER */}
      {/* ====================================================== */}

      <section className="w-full rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 shadow-soft backdrop-blur-xl sm:p-7">

        <div className="max-w-4xl">

          <p className="text-xs font-medium uppercase tracking-[0.32em] text-sky-300/80">
            Discover
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Explore arXiv research
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Search academic papers across computer science, mathematics,
            physics, statistics, and more.
          </p>

        </div>


        {/* ================================================== */}
        {/* SEARCH */}
        {/* ================================================== */}

        <form
          onSubmit={handleSearch}
          className="mt-7 flex w-full min-w-0 flex-col gap-3 sm:flex-row"
        >

          <div className="relative min-w-0 flex-1">

            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search papers, topics, authors..."
              className="h-12 w-full min-w-0 rounded-xl border border-white/10 bg-slate-900/80 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/40 focus:ring-1 focus:ring-sky-400/10"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 shrink-0 rounded-xl bg-sky-400 px-7 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>

        </form>

      </section>


      {/* ====================================================== */}
      {/* RESULTS HEADER */}
      {/* ====================================================== */}

      <section className="mt-7 flex min-w-0 items-end justify-between gap-4 px-1">

        <div className="min-w-0">

          <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
            Search results
          </p>

          <h2 className="mt-1 truncate text-xl font-semibold text-white sm:text-2xl">
            {query}
          </h2>

        </div>

        <div className="shrink-0 text-sm text-slate-500">
          Page {page}
        </div>

      </section>


      {/* ====================================================== */}
      {/* PAPERS */}
      {/* ====================================================== */}

      {loading ? (

        <div className="mt-5">
          <LoadingState label="Searching arXiv..." />
        </div>

      ) : (

        <>

          {papers.length > 0 ? (

            <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">

              {papers.map((paper) => (
                <div
                  key={
                    paper.id ||
                    paper.arxiv_id ||
                    paper.title
                  }
                  className="min-w-0"
                >
                  <PaperCard paper={paper} />
                </div>
              ))}

            </div>

          ) : (

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-10 text-center">

              <Search className="mx-auto h-8 w-8 text-slate-600" />

              <h3 className="mt-4 font-semibold text-white">
                No papers found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try a different research topic or search term.
              </p>

            </div>

          )}


          {/* ================================================== */}
          {/* PAGINATION */}
          {/* ================================================== */}

          {papers.length > 0 && (
            <div className="mt-7 flex items-center justify-center gap-2">

              <button
                disabled={page === 1 || loading}
                onClick={() => setPage((p) => p - 1)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-slate-400 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="grid h-10 min-w-10 place-items-center rounded-xl border border-sky-400/20 bg-sky-400/[0.07] px-3 text-sm font-medium text-sky-300">
                {page}
              </div>

              <button
                disabled={!hasMore || loading}
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-slate-400 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>
          )}

        </>

      )}

    </main>
  )
}



// import { useEffect, useState } from 'react'
// import { fetchDiscoverPapers } from '../services/api'
// import SearchBar from '../components/SearchBar'
// import PaperCard from '../components/PaperCard'
// import LoadingState from '../components/LoadingState'

// export default function DiscoverPage() {
//   const [papers, setPapers] = useState([])
//   const [query, setQuery] = useState('machine learning')
//   const [input, setInput] = useState('machine learning')
//   const [page, setPage] = useState(1)
//   const [hasMore, setHasMore] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const loadPapers = async (searchQuery, currentPage) => {
//     setLoading(true)

//     const result = await fetchDiscoverPapers({
//       query: searchQuery,
//       page: currentPage,
//       limit: 20,
//     })

//     setPapers(result.papers || [])
//     setHasMore(result.has_more || false)

//     setLoading(false)
//   }

//   useEffect(() => {
//     loadPapers(query, page)
//   }, [query, page])

//   const handleSearch = (e) => {
//     e.preventDefault()

//     const cleaned = input.trim()

//     if (!cleaned) return

//     setPage(1)
//     setQuery(cleaned)
//   }

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-soft backdrop-blur-xl">

//         <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">
//           Discover
//         </p>

//         <h1 className="mt-3 text-3xl font-semibold text-white">
//           Explore arXiv research
//         </h1>

//         <p className="mt-3 max-w-2xl text-slate-400">
//           Search millions of academic papers across computer science,
//           mathematics, physics, statistics, and more.
//         </p>

//         {/* Search */}
//         <form
//           onSubmit={handleSearch}
//           className="mt-7 flex gap-3"
//         >
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Search papers, topics, authors..."
//             className="flex-1 rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-3.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/40"
//           />

//           <button
//             type="submit"
//             className="rounded-2xl bg-sky-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
//           >
//             Search
//           </button>
//         </form>

//       </section>


//       {/* Results */}
//       {loading ? (
//         <LoadingState label="Searching arXiv..." />
//       ) : (
//         <>
//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-sm text-slate-500">
//                 Search results
//               </p>

//               <h2 className="mt-1 text-xl font-semibold text-white">
//                 {query}
//               </h2>
//             </div>

//             <p className="text-sm text-slate-500">
//               Page {page}
//             </p>

//           </div>


//           <div className="grid gap-6 xl:grid-cols-2">

//             {papers.map((paper) => (
//               <PaperCard
//                 key={paper.id || paper.arxiv_id || paper.title}
//                 paper={paper}
//               />
//             ))}

//           </div>


//           {/* Pagination */}
//           <div className="flex items-center justify-center gap-3 pt-4">

//             <button
//               disabled={page === 1 || loading}
//               onClick={() => setPage((p) => p - 1)}
//               className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-30"
//             >
//               Previous
//             </button>

//             <span className="rounded-xl border border-sky-400/20 bg-sky-400/[0.06] px-4 py-2.5 text-sm text-sky-300">
//               {page}
//             </span>

//             <button
//               disabled={!hasMore || loading}
//               onClick={() => setPage((p) => p + 1)}
//               className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-30"
//             >
//               Next
//             </button>

//           </div>
//         </>
//       )}

//     </div>
//   )
// }