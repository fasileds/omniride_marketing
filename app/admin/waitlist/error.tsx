'use client'

export default function WaitlistError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-8 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-sm">
        <h2 className="font-display text-xl font-bold text-navy-900 mb-2">
          Couldn't load waitlist
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {error.message ?? 'Failed to fetch waitlist entries.'}
        </p>
        <button
          onClick={reset}
          className="bg-navy-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-800 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  )
}
