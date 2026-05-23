import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { withApiLog } from '@/lib/api-logger'

export const GET = withApiLog('/api/waitlist/check', async (request) => {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ exists: false, valid: false })
  }

  const supabase = createServiceClient()
  const { data } = await supabase
    .from('waitlist')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  return NextResponse.json({ exists: !!data, valid: true })
})
