'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Shield, Star, Zap } from 'lucide-react'

const floatingBadges = [
  { icon: Shield, text: 'ID-Verified Travellers', delay: 0.9, x: '-left-4', y: 'top-1/4' },
  { icon: Star,   text: '4.9 avg. rating',        delay: 1.1, x: '-right-4', y: 'top-1/3' },
  { icon: Zap,    text: 'Same-day delivery',       delay: 1.3, x: '-left-2', y: 'bottom-1/4' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">

      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80"
        alt="Ethiopian intercity bus journey"
        fill priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/70 to-navy-950/90" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/40 via-transparent to-navy-950/40" aria-hidden="true" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">

        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
          </span>
          Now accepting early members · Launching Q3 2025
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Your Trip.{' '}
          <span className="relative inline-block">
            <span className="text-gold-500 italic">Someone's</span>
          </span>
          <br />
          <span className="text-gold-400 italic">Lifeline.</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          OmniRide connects everyday Ethiopian intercity travellers with people who need
          to send documents, parcels, and legal materials between cities — safely, affordably, and fast.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <Link
            href="/#waitlist"
            className="group inline-flex items-center gap-2 bg-gold-500 text-navy-900 px-8 py-4 rounded-full font-bold text-base hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105"
          >
            Join the Waitlist
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/20 transition-all"
          >
            See How It Works
          </Link>
        </motion.div>

        {/* Trust row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            '🔒 Escrow payments',
            '✅ ID-verified travellers',
            '📍 Real-time tracking',
            '🇪🇹 Built for Ethiopia',
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">{t}</span>
          ))}
        </motion.div>
      </div>

      {/* Floating badges — desktop only */}
      {floatingBadges.map(({ icon: Icon, text, delay, x, y }) => (
        <motion.div
          key={text}
          className={`hidden lg:flex absolute ${x} ${y} items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-lg`}
          initial={{ opacity: 0, x: x.includes('left') ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay, duration: 0.6 }}
          aria-hidden="true"
        >
          <Icon size={14} className="text-gold-400" />
          {text}
        </motion.div>
      ))}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-hidden="true"
      >
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-white/30 w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
