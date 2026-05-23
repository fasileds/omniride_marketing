export default function BlogEditorLoading() {
  return (
    <div className="min-h-screen bg-gray-50" aria-busy="true" aria-label="Loading editor">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>

      <div className="flex">
        {/* Left editor panel */}
        <div className="flex-1 px-8 py-8 space-y-6">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
          <div className="h-16 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="h-10 bg-gray-50 border-b border-gray-200" />
            <div className="p-4 space-y-3 min-h-[400px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-100 rounded animate-pulse"
                  style={{ width: `${Math.random() * 40 + 50}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-80 border-l border-gray-100 bg-white px-6 py-8 space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-9 bg-gray-100 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
