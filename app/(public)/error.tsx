'use client'

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F8F9FC]">
      <div className="text-center max-w-md">
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-3">Something went wrong</h2>
        <p className="text-gray-500 mb-6">{error.message ?? 'An unexpected error occurred.'}</p>
        <button
          onClick={reset}
          className="bg-navy-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-navy-800 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
