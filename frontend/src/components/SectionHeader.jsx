export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-sky-300/80">{subtitle}</p>
        <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
