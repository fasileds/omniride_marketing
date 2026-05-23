export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center" aria-busy="true" aria-label="Loading">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-navy-200 text-sm">Loading OmneRide…</p>
      </div>
    </div>
  )
}
