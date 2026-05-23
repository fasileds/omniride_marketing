import { NextResponse } from 'next/server'
import { createRouteClient } from '@/lib/supabase/route'
import { createServiceClient } from '@/lib/supabase/service'
import { resend, FROM_EMAIL, REPLY_TO } from '@/lib/resend'
import { blogNotificationEmail } from '@/lib/emails/blog-notification'
import { withApiLog } from '@/lib/api-logger'
import { SupabaseClient } from '@supabase/supabase-js'
import type { BlogPostUpdate, BlogPost, WaitlistEntry } from '@/types'

interface RouteContext {
  params: Promise<{ id: string }>
}

export const PATCH = withApiLog<RouteContext>(
  '/api/blog/[id]',
  async (request, { params }) => {
    const { id } = await params
    const authClient = await createRouteClient()
    const { data: { user } } = await authClient.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    let body: unknown
    try { body = await request.json() } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Fetch the current state before updating so we can detect publish transitions
    const { data: before } = await supabase
      .from('blog_posts')
      .select('published')
      .eq('id', id)
      .single()

    const { data, error } = await supabase
      .from('blog_posts')
      .update(body as BlogPostUpdate)
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const post = data as BlogPost
    const justPublished = !before?.published && post.published

    // Send blog notification to all waitlist subscribers when a post is freshly published
    if (justPublished && process.env.RESEND_API_KEY) {
      sendBlogNotifications(supabase, post).catch((err) =>
        console.error('[Resend] Blog notification failed:', err)
      )
    }

    return NextResponse.json(post)
  }
)

export const DELETE = withApiLog<RouteContext>(
  '/api/blog/[id]',
  async (request, { params }) => {
    const { id } = await params
    const authClient = await createRouteClient()
    const { data: { user } } = await authClient.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const supabase = createServiceClient()
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  }
)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function sendBlogNotifications(
  supabase: SupabaseClient,
  post: BlogPost
) {
  const { data: subscribers } = await supabase
    .from('waitlist')
    .select('email, full_name')

  if (!subscribers || subscribers.length === 0) return

  const entries = subscribers as Pick<WaitlistEntry, 'email' | 'full_name'>[]
  const { subject, html } = blogNotificationEmail({
    postTitle: post.title,
    postSlug: post.slug,
    postExcerpt: post.excerpt,
    coverImageUrl: post.cover_image_url,
    authorName: post.author_name,
    category: post.category,
    readTimeMinutes: post.read_time_minutes,
  })

  // Resend supports up to 50 recipients per call — batch if needed
  const BATCH = 50
  for (let i = 0; i < entries.length; i += BATCH) {
    const batch = entries.slice(i, i + BATCH)
    await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,
      to: batch.map((e) => e.email),
      subject,
      html,
    })
  }

  console.log(`[Resend] Sent blog notification for "${post.title}" to ${entries.length} subscribers`)
}
