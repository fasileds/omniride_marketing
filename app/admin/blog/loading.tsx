export default function AdminBlogLoading() {
  return (
    <div className="p-8" aria-busy="true" aria-label="Loading blog posts">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-7 w-28 bg-gray-200 rounded animate-pulse mb-1.5" />
          <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="h-9 w-28 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${60 + i * 20}px` }} />
          ))}
        </div>
        <div className="divide-y divide-gray-50">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="px-4 py-3.5 flex items-center gap-4">
              <div className="w-12 h-9 bg-gray-100 rounded-md animate-pulse hidden sm:block" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/3" />
              </div>
              <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse hidden sm:block" />
              <div className="h-5 w-20 bg-gray-100 rounded animate-pulse hidden md:block" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="w-7 h-7 bg-gray-100 rounded-md animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
