export default function AdminDashboardLoading() {
  return (
    <div className="p-8" aria-busy="true" aria-label="Loading dashboard">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-7 w-36 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse" />
            </div>
            <div className="h-9 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Tables skeleton */}
      <div className="grid lg:grid-cols-2 gap-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="divide-y divide-gray-50">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="px-6 py-4 flex items-center gap-3">
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                  </div>
                  <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
