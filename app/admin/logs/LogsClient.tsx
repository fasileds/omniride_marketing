'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Search,
  RefreshCw,
  ChevronDown,
  Wifi,
  AlertTriangle,
  Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ApiLogRow } from './page'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Stats {
  totalToday: number
  successRate: number
  avgDuration: number
  failuresToday: number
}

interface Props {
  initialLogs: ApiLogRow[]
  stats: Stats
}

type MethodFilter = 'ALL' | 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
type StatusFilter = 'ALL' | 'SUCCESS' | 'FAILURE'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const METHOD_COLORS: Record<string, string> = {
  GET:    'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30',
  POST:   'bg-blue-500/20   text-blue-300   ring-1 ring-blue-500/30',
  PATCH:  'bg-amber-500/20  text-amber-300  ring-1 ring-amber-500/30',
  PUT:    'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/30',
  DELETE: 'bg-red-500/20    text-red-300    ring-1 ring-red-500/30',
}

function methodBadge(method: string) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono min-w-[52px]',
        METHOD_COLORS[method] ?? 'bg-white/10 text-navy-200 ring-1 ring-white/10'
      )}
    >
      {method}
    </span>
  )
}

function statusBadge(status: number) {
  const ok = status >= 200 && status < 300
  const redirect = status >= 300 && status < 400
  const clientErr = status >= 400 && status < 500
  const serverErr = status >= 500

  const cls = ok
    ? 'bg-emerald-500/20 text-emerald-300'
    : redirect
    ? 'bg-sky-500/20 text-sky-300'
    : clientErr
    ? 'bg-amber-500/20 text-amber-300'
    : serverErr
    ? 'bg-red-500/20 text-red-300'
    : 'bg-white/10 text-navy-300'

  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold', cls)}>
      {status}
    </span>
  )
}

function durationBadge(ms: number | null) {
  if (ms === null) return <span className="text-navy-500 text-xs">—</span>
  const fast = ms < 300
  const medium = ms < 1000
  return (
    <span
      className={cn(
        'text-xs font-mono font-semibold',
        fast ? 'text-emerald-400' : medium ? 'text-amber-400' : 'text-red-400'
      )}
    >
      {ms.toLocaleString()} ms
    </span>
  )
}

function formatTs(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const today = new Date()
  const isToday = d.toDateString() === today.toDateString()
  if (isToday) return formatTs(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  variant = 'default',
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ElementType
  variant?: 'default' | 'success' | 'error' | 'warning'
}) {
  const variantMap = {
    default: 'text-sky-400    bg-sky-400/10',
    success: 'text-emerald-400 bg-emerald-400/10',
    error:   'text-red-400    bg-red-400/10',
    warning: 'text-amber-400  bg-amber-400/10',
  }
  return (
    <div className="bg-navy-800/60 rounded-xl border border-white/5 px-5 py-4 flex items-center gap-4">
      <span className={cn('p-2.5 rounded-lg', variantMap[variant].split(' ')[1])}>
        <Icon size={18} className={variantMap[variant].split(' ')[0]} />
      </span>
      <div>
        <p className="text-2xl font-bold text-white font-display leading-none">{value}</p>
        <p className="text-xs text-navy-300 mt-0.5">{label}</p>
        {sub && <p className="text-[10px] text-navy-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Expandable row detail
// ---------------------------------------------------------------------------

function LogRowDetail({ row }: { row: ApiLogRow }) {
  return (
    <div className="px-4 pb-4 pt-1 bg-navy-900/60 rounded-b-lg border-t border-white/5 space-y-3 text-xs text-navy-300">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-navy-500 mb-1">IP Address</p>
          <p className="font-mono text-white">{row.ip_address ?? '—'}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] uppercase tracking-wider text-navy-500 mb-1">User Agent</p>
          <p className="font-mono truncate text-white">{row.user_agent ?? '—'}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-navy-500 mb-1">Timestamp</p>
          <p className="font-mono text-white">{new Date(row.created_at).toISOString()}</p>
        </div>
      </div>

      {row.error_message && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          <AlertTriangle size={13} className="text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-red-400 mb-1">Error</p>
            <p className="text-red-300 font-mono break-all">{row.error_message}</p>
          </div>
        </div>
      )}

      {row.request_summary && Object.keys(row.request_summary).length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-wider text-navy-500 mb-1">Request Body</p>
          <pre className="bg-black/30 rounded-lg px-3 py-2 text-navy-200 overflow-x-auto text-[11px] leading-relaxed">
            {JSON.stringify(row.request_summary, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function LogsClient({ initialLogs, stats }: Props) {
  const router = useRouter()
  const [logs] = useState<ApiLogRow[]>(initialLogs)
  const [methodFilter, setMethodFilter] = useState<MethodFilter>('ALL')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const [endpointSearch, setEndpointSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [countdown, setCountdown] = useState(30)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Auto-refresh every 30 seconds
  useEffect(() => {
    function startCountdown() {
      setCountdown(30)
      countdownRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(countdownRef.current!)
            handleRefresh()
            return 30
          }
          return c - 1
        })
      }, 1000)
    }

    startCountdown()
    return () => { if (countdownRef.current) clearInterval(countdownRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleRefresh() {
    setRefreshing(true)
    router.refresh()
    setLastRefresh(new Date())
    // Brief visual feedback
    await new Promise((r) => setTimeout(r, 600))
    setRefreshing(false)
    setCountdown(30)
    if (countdownRef.current) clearInterval(countdownRef.current)
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countdownRef.current!)
          handleRefresh()
          return 30
        }
        return c - 1
      })
    }, 1000)
  }

  // Filtered view
  const filtered = useMemo(() => {
    return logs.filter((row) => {
      if (methodFilter !== 'ALL' && row.method !== methodFilter) return false
      if (statusFilter === 'SUCCESS' && !row.success) return false
      if (statusFilter === 'FAILURE' && row.success) return false
      if (endpointSearch && !row.endpoint.toLowerCase().includes(endpointSearch.toLowerCase())) return false
      return true
    })
  }, [logs, methodFilter, statusFilter, endpointSearch])

  const methods: MethodFilter[] = ['ALL', 'GET', 'POST', 'PATCH', 'DELETE']
  const statuses: StatusFilter[] = ['ALL', 'SUCCESS', 'FAILURE']

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="API calls today"
          value={stats.totalToday.toLocaleString()}
          icon={Activity}
          variant="default"
        />
        <StatCard
          label="Success rate"
          value={`${stats.successRate}%`}
          sub={stats.totalToday > 0 ? `${stats.totalToday - stats.failuresToday} of ${stats.totalToday}` : 'no calls yet'}
          icon={CheckCircle2}
          variant="success"
        />
        <StatCard
          label="Avg response time"
          value={stats.avgDuration > 0 ? `${stats.avgDuration} ms` : '—'}
          sub="today's calls"
          icon={Clock}
          variant="warning"
        />
        <StatCard
          label="Failures today"
          value={stats.failuresToday}
          icon={XCircle}
          variant={stats.failuresToday > 0 ? 'error' : 'success'}
        />
      </div>

      {/* Filter bar */}
      <div className="bg-navy-800/60 rounded-xl border border-white/5 p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              placeholder="Filter by endpoint…"
              value={endpointSearch}
              onChange={(e) => setEndpointSearch(e.target.value)}
              className="w-full bg-navy-900/60 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder:text-navy-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Method filter */}
            <div className="flex rounded-lg overflow-hidden border border-white/10">
              {methods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMethodFilter(m)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-semibold transition-colors',
                    methodFilter === m
                      ? 'bg-gold-500 text-navy-900'
                      : 'text-navy-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex rounded-lg overflow-hidden border border-white/10">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-semibold transition-colors',
                    statusFilter === s
                      ? 'bg-gold-500 text-navy-900'
                      : 'text-navy-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {s === 'SUCCESS' ? '✓ Success' : s === 'FAILURE' ? '✕ Failure' : 'All Status'}
                </button>
              ))}
            </div>

            {/* Refresh button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-navy-300 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={12} className={cn(refreshing && 'animate-spin')} />
              {refreshing ? 'Refreshing…' : `Refresh (${countdown}s)`}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-xs text-navy-500">
          <Wifi size={11} className="text-emerald-500" />
          <span>
            Showing <span className="text-white font-medium">{filtered.length}</span> of{' '}
            <span className="text-white font-medium">{logs.length}</span> entries · last updated{' '}
            {lastRefresh.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Log table */}
      <div className="bg-navy-800/60 rounded-xl border border-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Info size={32} className="text-navy-500" />
            <p className="text-navy-400 text-sm">No log entries match your filters</p>
            <button
              onClick={() => {
                setMethodFilter('ALL')
                setStatusFilter('ALL')
                setEndpointSearch('')
              }}
              className="text-xs text-gold-500 hover:text-gold-400 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="hidden md:grid grid-cols-[140px_80px_1fr_72px_88px_72px_1fr] gap-3 px-4 py-2.5 text-[10px] uppercase tracking-wider text-navy-500 border-b border-white/5 bg-navy-900/40">
              <span>Timestamp</span>
              <span>Method</span>
              <span>Endpoint</span>
              <span>Status</span>
              <span>Duration</span>
              <span>Result</span>
              <span>Message</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {filtered.map((row) => {
                const expanded = expandedId === row.id
                const hasDetail = !!(row.error_message || row.request_summary || row.ip_address || row.user_agent)
                return (
                  <div key={row.id}>
                    <button
                      onClick={() => hasDetail && setExpandedId(expanded ? null : row.id)}
                      className={cn(
                        'w-full text-left grid grid-cols-1 md:grid-cols-[140px_80px_1fr_72px_88px_72px_1fr] gap-x-3 gap-y-1 px-4 py-3 transition-colors',
                        row.success
                          ? 'hover:bg-white/[0.03]'
                          : 'bg-red-500/[0.04] hover:bg-red-500/[0.07]',
                        hasDetail && 'cursor-pointer',
                        !hasDetail && 'cursor-default'
                      )}
                    >
                      {/* Timestamp */}
                      <span className="text-xs text-navy-400 font-mono self-center">
                        {formatDate(row.created_at)}
                      </span>

                      {/* Method */}
                      <span className="self-center">
                        {methodBadge(row.method)}
                      </span>

                      {/* Endpoint */}
                      <span className="text-sm text-white font-mono self-center truncate">
                        {row.endpoint}
                      </span>

                      {/* Status code */}
                      <span className="self-center">
                        {statusBadge(row.status_code)}
                      </span>

                      {/* Duration */}
                      <span className="self-center">
                        {durationBadge(row.duration_ms)}
                      </span>

                      {/* Success / failure */}
                      <span className="self-center">
                        {row.success ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                            <CheckCircle2 size={13} />
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-red-400">
                            <XCircle size={13} />
                          </span>
                        )}
                      </span>

                      {/* Error message / expand hint */}
                      <span className="flex items-center justify-between gap-2 min-w-0">
                        <span className={cn(
                          'text-xs truncate',
                          row.error_message ? 'text-red-400' : 'text-navy-500'
                        )}>
                          {row.error_message ?? (row.success ? 'OK' : '—')}
                        </span>
                        {hasDetail && (
                          <ChevronDown
                            size={13}
                            className={cn(
                              'shrink-0 text-navy-500 transition-transform',
                              expanded && 'rotate-180'
                            )}
                          />
                        )}
                      </span>
                    </button>

                    {/* Expanded detail */}
                    {expanded && <LogRowDetail row={row} />}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-navy-600">
        Displaying up to 500 most recent entries · older logs are stored in Supabase
      </p>
    </div>
  )
}
