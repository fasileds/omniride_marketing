import type { Metadata } from 'next'
import FaqContent from './FaqContent'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about OmniRide — how to send parcels, how travellers earn, safety policies, and more.',
  openGraph: { title: 'OmniRide FAQ', description: 'All your questions answered.' },
  twitter: { card: 'summary_large_image' },
}

export default function FaqPage() {
  return <FaqContent />
}
