import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'OmniRide — Ethiopian Peer-to-Peer City Delivery',
    template: '%s | OmniRide',
  },
  description:
    'Connect with intercity travellers to send documents, parcels, and legal materials between Ethiopian cities safely and affordably.',
  keywords: ['Ethiopia delivery', 'peer-to-peer courier', 'intercity shipping', 'Ethiopian logistics'],
  authors: [{ name: 'OmniRide Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://omniride.et',
    siteName: 'OmniRide',
    images: [{ url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@omniride_et',
  },
  metadataBase: new URL('https://omniride.et'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#0F2447', color: '#fff', fontFamily: 'var(--font-inter)' },
            success: { iconTheme: { primary: '#F5A623', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}
