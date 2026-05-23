export default function FaqLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="h-40 bg-navy-200 animate-pulse mb-8" />
      <div className="max-w-3xl mx-auto px-4 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-14 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  )
}
