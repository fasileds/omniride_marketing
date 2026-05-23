import type { Metadata } from 'next'
import CitiesContent from './CitiesContent'

export const metadata: Metadata = {
  title: 'Cities & Routes',
  description: 'Explore all intercity delivery routes available on OmniRide across Ethiopia. From Addis Ababa to Bahir Dar, Hawassa, Dire Dawa, and more.',
  openGraph: { title: 'OmniRide Cities & Routes', description: 'All delivery routes across Ethiopia.' },
  twitter: { card: 'summary_large_image' },
}

export default function CitiesPage() {
  return <CitiesContent />
}
