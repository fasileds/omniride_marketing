import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'
import { resend, FROM_EMAIL, REPLY_TO } from '@/lib/resend'
import { welcomeEmail } from '@/lib/emails/welcome'
import { withApiLog } from '@/lib/api-logger'
import type { WaitlistFormData } from '@/types'

export const POST = withApiLog('/api/waitlist', async (request) => {
  let body: unknown
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const data = body as Partial<WaitlistFormData>
  const { full_name, email, phone, role } = data

  if (!full_name?.trim() || !email?.trim() || !phone?.trim() || !role) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }
  if (!['traveller', 'sender', 'both'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // Check for duplicate before insert for a clear error message
  const { data: existing } = await supabase
    .from('waitlist')
    .select('id')
    .eq('email', email.trim().toLowerCase())
    .maybeSingle()

  if (existing) {
    return NextResponse.json(
      { error: 'This email is already on the waitlist', already_registered: true },
      { status: 409 }
    )
  }

  const { error: insertError } = await supabase.from('waitlist').insert({
    full_name: full_name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    role,
  })

  if (insertError) {
    console.error('Waitlist insert error:', insertError)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }

  // Send welcome email via Resend (non-blocking — don't fail the request if email fails)
  if (process.env.RESEND_API_KEY) {
    const { subject, html } = welcomeEmail(full_name.trim(), role)
    resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,
      to: email.trim().toLowerCase(),
      subject,
      html,
    }).catch((err) => console.error('[Resend] Welcome email failed:', err))
  }

  return NextResponse.json({ success: true }, { status: 201 })
})
