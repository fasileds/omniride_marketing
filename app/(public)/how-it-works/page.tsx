import type { Metadata } from 'next'
import HowItWorksContent from './HowItWorksContent'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how OmniRide connects senders with verified intercity travellers to deliver parcels across Ethiopia safely and affordably.',
  openGraph: {
    title: 'How OmniRide Works',
    description: 'Step-by-step guide to sending and receiving with OmniRide.',
  },
  twitter: { card: 'summary_large_image' },
}

export default function HowItWorksPage() {
  return <HowItWorksContent />
}
