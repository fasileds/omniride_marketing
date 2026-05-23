import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, ArrowRight } from 'lucide-react'

const columns = [
  {
    heading: 'Platform',
    links: [
      { label: 'How It Works',     href: '/how-it-works' },
      { label: 'Cities & Routes',  href: '/cities' },
      { label: 'Join as Traveller',href: '/#waitlist' },
      { label: 'Send a Parcel',    href: '/#waitlist' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',  href: '/about' },
      { label: 'Blog',      href: '/blog' },
      { label: 'Careers',   href: '/about#careers' },
      { label: 'Press Kit', href: '/about#press' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'FAQ',              href: '/faq' },
      { label: 'Safety Guidelines',href: '/faq#safety' },
      { label: 'Community Rules',  href: '/faq#community' },
      { label: 'Contact Us',       href: 'mailto:hello@omneride.et' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',  href: '/privacy' },
      { label: 'Terms of Service',href: '/terms' },
      { label: 'Cookie Policy',   href: '/cookies' },
    ],
  },
]

const socials = [
  { Icon: Facebook,  href: 'https://facebook.com',  label: 'Facebook' },
  { Icon: Twitter,   href: 'https://twitter.com',   label: 'Twitter / X' },
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: Linkedin,  href: 'https://linkedin.com',  label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950" aria-label="Site footer">

      {/* Top CTA strip */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl font-bold text-white">Ready to get early access?</p>
            <p className="text-navy-400 text-sm mt-1">Be first in line when we launch. Zero spam.</p>
          </div>
          <Link
            href="/#waitlist"
            className="shrink-0 inline-flex items-center gap-2 bg-gold-500 text-navy-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20"
          >
            Join the Waitlist <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="font-display text-2xl font-extrabold text-white inline-block mb-4">
              <span className="text-gold-500">Omne</span>Ride
            </Link>
            <p className="text-navy-400 text-sm leading-relaxed mb-5">
              Ethiopia's peer-to-peer intercity delivery platform, powered by everyday travellers.
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@omneride.et" className="flex items-center gap-2 text-navy-400 text-sm hover:text-gold-500 transition-colors">
                <Mail size={13} aria-hidden="true" /> hello@omneride.et
              </a>
              <a href="tel:+251911000000" className="flex items-center gap-2 text-navy-400 text-sm hover:text-gold-500 transition-colors">
                <Phone size={13} aria-hidden="true" /> +251 911 000 000
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-display text-xs font-bold text-white uppercase tracking-[0.15em] mb-4">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-navy-400 hover:text-gold-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-500 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} OmneRide Technologies PLC. All rights reserved. · Addis Ababa, Ethiopia 🇪🇹
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-navy-400 hover:text-gold-400 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
