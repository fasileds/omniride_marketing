'use client'

import Link from 'next/link'

export default function AdminBlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-8 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-sm">
        <h2 className="font-display text-xl font-bold text-navy-900 mb-2">Couldn't load posts</h2>
        <p className="text-gray-500 text-sm mb-6">{error.message ?? 'Failed to fetch blog posts.'}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-navy-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-navy-800 transition-colors"
          >
            Retry
          </button>
          <Link
            href="/admin"
            className="border border-gray-200 text-gray-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
