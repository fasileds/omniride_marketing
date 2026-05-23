'use client'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-8 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-sm">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-2xl">!</span>
        </div>
        <h2 className="font-display text-xl font-bold text-navy-900 mb-2">Dashboard error</h2>
        <p className="text-gray-500 text-sm mb-6">
          {error.message ?? 'Something went wrong loading the dashboard.'}
        </p>
        <button
          onClick={reset}
          className="bg-navy-900 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-navy-800 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  )
}
