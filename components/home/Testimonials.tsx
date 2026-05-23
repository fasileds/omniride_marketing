'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Selam Tadesse',
    location: 'Addis Ababa → Bahir Dar',
    role: 'Sender',
    roleColor: 'bg-amber-100 text-amber-700',
    quote: 'I needed urgent court documents in Bahir Dar by morning. OmneRide matched me with a traveller leaving that afternoon. Documents arrived in 6 hours. Absolute lifesaver.',
    avatar: 'ST',
    avatarBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dawit Haile',
    location: 'Traveller — Addis Ababa',
    role: 'Traveller',
    roleColor: 'bg-blue-100 text-blue-700',
    quote: 'I travel Addis–Hawassa every weekend for family. OmneRide lets me earn 400–600 ETB per trip just by carrying packages I\'d have room for anyway. It\'s changed everything.',
    avatar: 'DH',
    avatarBg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    rating: 5,
  },
  {
    id: 3,
    name: 'Meron Bekele',
    location: 'Hawassa → Addis Ababa',
    role: 'Sender',
    roleColor: 'bg-amber-100 text-amber-700',
    quote: 'My mother sends traditional coffee and injera flour every month. Before OmneRide, getting it here was nearly impossible. Now it arrives fresh, every time.',
    avatar: 'MB',
    avatarBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#F8F9FC] relative overflow-hidden" aria-label="Testimonials">

      {/* Background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-900/5 rounded-full -translate-x-1/2 translate-y-1/2" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gold-500 font-bold text-sm uppercase tracking-[0.2em] mb-3">Community Stories</p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-navy-900 leading-tight">
            Real people. <span className="text-gold-500">Real deliveries.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ id, name, location, role, roleColor, quote, avatar, avatarBg, rating }, i) => (
            <motion.article
              key={id}
              className="relative bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-navy-900/5 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              aria-label={`Testimonial from ${name}`}
            >
              {/* Large decorative quote */}
              <Quote
                size={48}
                className="absolute top-5 right-6 text-gray-100"
                aria-hidden="true"
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-5" aria-label={`${rating} stars`}>
                {Array.from({ length: rating }).map((_, si) => (
                  <svg key={si} className="w-4 h-4 fill-gold-500" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-gray-700 text-sm leading-relaxed mb-7 relative z-10">
                "{quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0`} aria-hidden="true">
                  {avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-navy-900 text-sm">{name}</p>
                  <p className="text-gray-400 text-xs truncate">{location}</p>
                </div>
                <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold ${roleColor}`}>
                  {role}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
