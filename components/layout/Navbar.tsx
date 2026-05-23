'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'How It Works',   href: '/how-it-works' },
  { label: 'Cities & Routes',href: '/cities' },
  { label: 'Blog',           href: '/blog' },
  { label: 'About',          href: '/about' },
  { label: 'FAQ',            href: '/faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const solid = scrolled || !isHome || menuOpen

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        solid ? 'bg-navy-900/95 backdrop-blur-lg shadow-lg shadow-black/20' : 'bg-transparent'
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-extrabold text-white flex items-center gap-0.5" aria-label="OmniRide home">
          <span className="text-gold-500">Omni</span><span>Ride</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ label, href }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all',
                    active
                      ? 'text-gold-400'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  )}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-px left-3 right-3 h-[2px] bg-gold-500 rounded-full"
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <Link
          href="/#waitlist"
          className="hidden md:inline-flex items-center gap-1.5 bg-gold-500 text-navy-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-gold-400 transition-all shadow-md shadow-gold-500/20 hover:shadow-gold-500/40 hover:scale-105"
        >
          Join Waitlist <ArrowRight size={14} />
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-navy-900 border-t border-white/10"
          >
            <div className="px-4 py-3">
              <ul className="flex flex-col gap-1" role="list">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'flex items-center py-2.5 px-3 rounded-xl text-sm font-medium transition-colors',
                        pathname === href
                          ? 'bg-white/10 text-gold-400'
                          : 'text-white/75 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-white/10">
                <Link
                  href="/#waitlist"
                  className="flex items-center justify-center gap-2 bg-gold-500 text-navy-900 py-3 rounded-xl text-sm font-bold hover:bg-gold-400 transition-colors"
                >
                  Join Waitlist <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
