'use client'

import Link from 'next/link'

export default function BlogDetailError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-3">Couldn't load this post</h2>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="bg-navy-900 text-white px-5 py-2 rounded-full text-sm font-semibold">
            Retry
          </button>
          <Link href="/blog" className="bg-gray-100 text-navy-700 px-5 py-2 rounded-full text-sm font-semibold">
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
