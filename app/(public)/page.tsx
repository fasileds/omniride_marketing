import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import ProblemSolution from '@/components/home/ProblemSolution'
import TrustSafety from '@/components/home/TrustSafety'
import CitiesRoutes from '@/components/home/CitiesRoutes'
import Testimonials from '@/components/home/Testimonials'
import BlogPreview from '@/components/home/BlogPreview'
import WaitlistForm from '@/components/home/WaitlistForm'

export const metadata: Metadata = {
  title: 'OmniRide — Ethiopian Peer-to-Peer City Delivery',
  description:
    'Connect with intercity travellers to send documents, parcels, and legal materials between Ethiopian cities safely and affordably.',
  openGraph: {
    title: 'OmniRide — Your Trip. Someone\'s Lifeline.',
    description: 'Ethiopia\'s peer-to-peer intercity delivery platform launching soon.',
    images: [{ url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmniRide — Your Trip. Someone\'s Lifeline.',
    description: 'Ethiopia\'s peer-to-peer intercity delivery platform launching soon.',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProblemSolution />
      <TrustSafety />
      <CitiesRoutes />
      <Testimonials />
      <BlogPreview />
      <WaitlistForm />
    </>
  )
}
