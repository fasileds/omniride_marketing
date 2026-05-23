'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { XCircle, CheckCircle2 } from 'lucide-react'

const problems = [
  'Documents stuck for days in the postal system',
  'Expensive couriers that don\'t reach smaller cities',
  'Zero tracking — you never know where your parcel is',
  'Legal deadlines missed because of unreliable delivery',
]
const solutions = [
  'Send with a traveller leaving today on your exact route',
  'Flat fee pricing — typically 60–80% cheaper than couriers',
  'Live updates at every handoff point, SMS + in-app',
  'Same-day delivery between Addis, Bahir Dar, Hawassa & more',
]

export default function ProblemSolution() {
  return (
    <section className="py-28 bg-[#F8F9FC] overflow-hidden" aria-label="Problem and solution">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold-500 font-bold text-sm uppercase tracking-[0.2em] mb-3">The Problem We're Solving</p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-navy-900 leading-tight mb-4">
            Ethiopia deserves <br className="hidden sm:block" />
            <span className="text-gold-500">better delivery</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Millions of Ethiopians face real barriers when trying to move important items between cities. We fix this with a community-powered network.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20">

          {/* Problem card */}
          <motion.div
            className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
                <XCircle size={13} /> The Old Way
              </span>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-6">
                Broken, slow, and expensive
              </h3>
              <ul className="flex flex-col gap-4" role="list">
                {problems.map((p, i) => (
                  <motion.li
                    key={p}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <XCircle size={12} className="text-red-500" aria-hidden="true" />
                    </span>
                    <span className="text-gray-600 text-sm leading-relaxed">{p}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Solution card */}
          <motion.div
            className="relative bg-navy-900 rounded-3xl p-8 overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Gold glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl" aria-hidden="true" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide border border-gold-500/30">
                <CheckCircle2 size={13} /> The OmneRide Way
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-6">
                Fast, trusted, community-powered
              </h3>
              <ul className="flex flex-col gap-4" role="list">
                {solutions.map((s, i) => (
                  <motion.li
                    key={s}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-gold-400" aria-hidden="true" />
                    </span>
                    <span className="text-white/80 text-sm leading-relaxed">{s}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Image strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { src: 'photo-1488646953014-85cb44e25828', alt: 'Intercity traveller ready to carry', caption: 'Trusted Travellers' },
            { src: 'photo-1586528116311-ad8dd3c8310d', alt: 'Parcel ready for delivery',          caption: 'Any Parcel, Any Route' },
            { src: 'photo-1529156069898-49953e39b3ac', alt: 'Community connecting in Ethiopia',   caption: 'Community Powered' },
          ].map(({ src, alt, caption }, i) => (
            <motion.div
              key={src}
              className="relative h-56 rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Image
                src={`https://images.unsplash.com/${src}?w=1200&q=80`}
                alt={alt} fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white text-sm font-semibold">{caption}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
