export default function WaitlistLoading() {
  return (
    <div className="p-8" aria-busy="true" aria-label="Loading waitlist">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-7 w-24 bg-gray-200 rounded animate-pulse mb-1.5" />
          <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="h-9 w-36 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Filters skeleton */}
      <div className="flex gap-3 mb-6">
        <div className="h-9 w-56 bg-gray-200 rounded-lg animate-pulse" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-16 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex gap-6">
          {['#', 'Name', 'Email', 'Phone', 'Role', 'Joined'].map((h) => (
            <div key={h} className="h-3.5 bg-gray-200 rounded animate-pulse w-12" />
          ))}
        </div>
        <div className="divide-y divide-gray-50">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="px-4 py-3.5 flex items-center gap-4">
              <div className="h-4 w-4 bg-gray-100 rounded animate-pulse" />
              <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="hidden sm:block flex-1 h-4 bg-gray-100 rounded animate-pulse" />
              <div className="hidden md:block w-28 h-4 bg-gray-100 rounded animate-pulse" />
              <div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" />
              <div className="hidden lg:block w-24 h-4 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
