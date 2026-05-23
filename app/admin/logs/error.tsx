'use client'

import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function LogsError({ error, reset }: Props) {
  return (
    <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-navy-800/60 rounded-2xl border border-red-500/20 p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <h2 className="font-display text-xl font-bold text-white mb-2">
          Failed to load API logs
        </h2>
        <p className="text-navy-300 text-sm mb-1">
          {error.message ?? 'An unexpected error occurred while fetching the log data.'}
        </p>
        {error.digest && (
          <p className="text-navy-500 text-xs mb-6 font-mono">Error ID: {error.digest}</p>
        )}
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-gold-400 transition-colors"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/15 transition-colors"
          >
            <LayoutDashboard size={14} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
