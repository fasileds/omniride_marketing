'use client'

import Link from 'next/link'

export default function BlogEditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <h2 className="font-display text-xl font-bold text-navy-900 mb-2">
          Editor failed to load
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {error.message ?? 'Could not load this post for editing.'}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-navy-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-navy-800 transition-colors"
          >
            Retry
          </button>
          <Link
            href="/admin/blog"
            className="border border-gray-200 text-gray-600 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    </div>
  )
}
