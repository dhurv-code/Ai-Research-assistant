// import { Search } from 'lucide-react'

// export default function SearchBar({ value, onChange, placeholder = 'Search papers, topics or keywords' }) {
//   return (
//     <div className="relative w-full max-w-lg">
//       <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//       <input
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-12 py-4 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 dark:border-slate-700"
//       />
//     </div>
//   )
// }
import { Search } from 'lucide-react'

export default function SearchBar({
  value,
  onChange,
  placeholder='Search papers, topics or keywords'
}) {

  return (

    <div className="relative w-full max-w-lg">

      <Search
        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      />

      <input

        value={value}

        onChange={(e)=>{

          if(onChange){

            onChange(
              e.target.value
            )

          }

        }}

        placeholder={placeholder}

        className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-12 py-4 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 dark:border-slate-700"

      />

    </div>

  )

}