'use client'

import Link from 'next/link'

export default function BlogError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-navy-900 mb-3">Failed to load blog posts</h2>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="bg-navy-900 text-white px-5 py-2 rounded-full text-sm font-semibold">Retry</button>
          <Link href="/" className="bg-gray-100 text-navy-700 px-5 py-2 rounded-full text-sm font-semibold">Go Home</Link>
        </div>
      </div>
    </div>
  )
}
