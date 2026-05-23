import { NextResponse } from 'next/server'
import { createRouteClient } from '@/lib/supabase/route'
import { createServiceClient } from '@/lib/supabase/service'
import { withApiLog } from '@/lib/api-logger'
import type { BlogPostInsert } from '@/types'

export const POST = withApiLog('/api/blog', async (request) => {
  const authClient = await createRouteClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: unknown
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(body as BlogPostInsert)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
})
