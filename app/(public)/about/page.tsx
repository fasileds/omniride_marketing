import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the OmniRide team, our mission to transform intercity delivery across Ethiopia, and the story behind our platform.',
  openGraph: { title: 'About OmniRide', description: 'Our mission, team, and story.' },
  twitter: { card: 'summary_large_image' },
}

export default function AboutPage() {
  return <AboutContent />
}
