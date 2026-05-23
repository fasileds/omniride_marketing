export default function BlogDetailLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <div className="h-72 bg-gray-200 animate-pulse rounded-xl" />
      <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4" />
      <div className="h-10 bg-gray-200 animate-pulse rounded" />
      <div className="h-10 bg-gray-200 animate-pulse rounded w-3/4" />
      <div className="space-y-3 mt-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    </div>
  )
}
