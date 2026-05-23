export default function LogsLoading() {
  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-7 w-32 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-4 w-80 bg-white/5 rounded mt-2 animate-pulse" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-navy-800/60 rounded-xl border border-white/5 px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-6 w-20 bg-white/10 rounded animate-pulse" />
                <div className="h-3 w-28 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="bg-navy-800/60 rounded-xl border border-white/5 p-4 mb-6">
          <div className="h-9 w-full bg-white/5 rounded-lg animate-pulse" />
        </div>

        {/* Table skeleton */}
        <div className="bg-navy-800/60 rounded-xl border border-white/5 overflow-hidden">
          <div className="h-9 bg-navy-900/40 border-b border-white/5 animate-pulse" />
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="px-4 py-3 border-b border-white/5 grid grid-cols-[140px_80px_1fr_72px_88px_72px_1fr] gap-3"
            >
              <div className="h-4 bg-white/5 rounded animate-pulse" />
              <div className="h-5 w-14 bg-white/10 rounded animate-pulse" />
              <div className="h-4 bg-white/5 rounded animate-pulse" />
              <div className="h-5 w-10 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-6 bg-white/5 rounded-full animate-pulse" />
              <div className="h-4 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
