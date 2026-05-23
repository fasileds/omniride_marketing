import { createServiceClient } from '@/lib/supabase/service'
import LogsClient from './LogsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Logs | OmniRide Admin',
  description: 'Monitor all API calls, success rates, and errors',
}

// Always server-render — admin page with live DB data, no prerendering
export const dynamic = 'force-dynamic'

export interface ApiLogRow {
  id: string
  endpoint: string
  method: string
  status_code: number
  success: boolean
  duration_ms: number | null
  error_message: string | null
  request_summary: Record<string, unknown> | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export default async function AdminLogsPage() {
  const supabase = createServiceClient()

  // Fetch the most recent 500 log entries
  const { data: logs, error } = await supabase
    .from('api_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)

  if (error) {
    throw new Error(`Failed to load API logs: ${error.message}`)
  }

  const rows = (logs ?? []) as ApiLogRow[]

  // Pre-compute today's stats server-side so initial render has values
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayRows = rows.filter((r) => new Date(r.created_at) >= todayStart)
  const successToday = todayRows.filter((r) => r.success).length
  const failuresToday = todayRows.filter((r) => !r.success).length
  const avgDuration =
    todayRows.length > 0
      ? Math.round(
          todayRows.reduce((acc, r) => acc + (r.duration_ms ?? 0), 0) / todayRows.length
        )
      : 0
  const successRate =
    todayRows.length > 0 ? Math.round((successToday / todayRows.length) * 100) : 100

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-white">API Logs</h1>
          <p className="text-navy-300 text-sm mt-1">
            Live activity log for all API endpoints — last 500 calls · auto-refreshes every 30 s
          </p>
        </div>

        <LogsClient
          initialLogs={rows}
          stats={{ totalToday: todayRows.length, successRate, avgDuration, failuresToday }}
        />
      </div>
    </div>
  )
}
