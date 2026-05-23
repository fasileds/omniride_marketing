export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="h-40 bg-navy-200 animate-pulse" />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="h-80 bg-gray-200 rounded-2xl animate-pulse mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="h-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
