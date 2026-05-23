'use client'

import Link from 'next/link'

export default function FaqError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F8F9FC]">
      <div className="text-center max-w-md">
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-3">
          Couldn't load the FAQ
        </h2>
        <p className="text-gray-500 mb-6">
          Something went wrong. You can also reach us at{' '}
          <a href="mailto:hello@omneride.et" className="text-navy-700 font-semibold">
            hello@omneride.et
          </a>
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-navy-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-navy-800 transition-colors text-sm"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-gray-100 text-navy-700 px-6 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
