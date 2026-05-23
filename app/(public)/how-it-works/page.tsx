import type { Metadata } from 'next'
import HowItWorksContent from './HowItWorksContent'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how OmneRide connects senders with verified intercity travellers to deliver parcels across Ethiopia safely and affordably.',
  openGraph: {
    title: 'How OmneRide Works',
    description: 'Step-by-step guide to sending and receiving with OmneRide.',
  },
  twitter: { card: 'summary_large_image' },
}

export default function HowItWorksPage() {
  return <HowItWorksContent />
}
