import { createServiceClient } from '@/lib/supabase/service'
import { NextResponse } from 'next/server'

export interface ApiLogEntry {
  endpoint: string
  method: string
  status_code: number
  success: boolean
  duration_ms: number
  error_message?: string
  request_summary?: Record<string, unknown>
  ip_address?: string
  user_agent?: string
}

/** Fire-and-forget: inserts a log row using the service client. Never throws. */
export async function logApiCall(entry: ApiLogEntry): Promise<void> {
  try {
    const supabase = createServiceClient()
    await supabase.from('api_logs').insert(entry)
  } catch (err) {
    // Logging must never crash the app
    console.error('[ApiLogger] Failed to write log:', err)
  }
}

/** Extract a safe, sanitised snapshot of the request body for logging. */
export async function safeRequestSummary(
  request: Request
): Promise<Record<string, unknown> | undefined> {
  try {
    const cloned = request.clone()
    const body = await cloned.json() as Record<string, unknown>
    // Redact any sensitive fields
    const REDACT = ['password', 'token', 'secret', 'key', 'service_role']
    const safe: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(body)) {
      safe[k] = REDACT.some((r) => k.toLowerCase().includes(r)) ? '[REDACTED]' : v
    }
    return safe
  } catch {
    return undefined
  }
}

type HandlerFn<C = undefined> = C extends undefined
  ? (req: Request) => Promise<NextResponse>
  : (req: Request, ctx: C) => Promise<NextResponse>

/**
 * Wraps a Next.js route handler with automatic timing + logging.
 *
 * Usage (no dynamic params):
 *   export const POST = withApiLog('/api/waitlist', async (req) => { ... })
 *
 * Usage (with params):
 *   export const PATCH = withApiLog('/api/blog/[id]', async (req, ctx) => { ... })
 */
export function withApiLog<C = undefined>(
  endpointName: string,
  handler: (req: Request, ctx: C) => Promise<NextResponse>
): (req: Request, ctx: C) => Promise<NextResponse> {
  return async (request: Request, ctx: C): Promise<NextResponse> => {
    const start = Date.now()
    const method = request.method
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? request.headers.get('x-real-ip')
      ?? 'unknown'
    const userAgent = request.headers.get('user-agent') ?? undefined

    let response: NextResponse
    let errorMessage: string | undefined

    try {
      response = await handler(request, ctx)
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : String(err)
      response = NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const duration = Date.now() - start
    const statusCode = response.status
    const success = statusCode >= 200 && statusCode < 300

    // Non-blocking log
    logApiCall({
      endpoint: endpointName,
      method,
      status_code: statusCode,
      success,
      duration_ms: duration,
      error_message: errorMessage,
      ip_address: ip,
      user_agent: userAgent,
    }).catch(() => {})

    return response
  }
}
