import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'placeholder') {
  console.warn('[Resend] RESEND_API_KEY is not set — emails will be skipped.')
}

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')

/**
 * The FROM address must use a domain you have verified in the Resend dashboard.
 * → https://resend.com/domains
 * Add omneride.com (or omneride.et), add the DNS records, wait for "Verified".
 * Until then Resend will reject every send with a 403 error.
 *
 * Quick test without domain verification: swap to 'onboarding@resend.dev'
 */
export const FROM_EMAIL = 'OmneRide <no-reply@omneride.com>'
export const REPLY_TO   = 'hello@omneride.et'
