import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('[Resend] RESEND_API_KEY is not set — emails will be skipped.')
}

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
export const FROM_EMAIL = 'OmniRide <noreply@omniride.et>'
export const REPLY_TO  = 'hello@omniride.et'
