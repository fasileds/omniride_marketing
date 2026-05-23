import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-8xl font-bold text-gold-500 mb-4">404</h1>
        <h2 className="font-display text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-navy-200 mb-8 max-w-md">
          The page you're looking for doesn't exist. It may have been moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-block bg-gold-500 text-navy-900 px-8 py-3 rounded-full font-semibold hover:bg-gold-400 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
