'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Zap, Globe } from 'lucide-react'

const values = [
  { Icon: Heart, title: 'Community First', desc: 'Every feature we build strengthens the trust between senders and travellers in our network.' },
  { Icon: Zap, title: 'Speed & Reliability', desc: 'Same-day delivery between major Ethiopian cities is our baseline, not our stretch goal.' },
  { Icon: Globe, title: 'Accessible to All', desc: 'Designed for Ethiopians — affordable pricing, local languages, and offline-capable flows.' },
]

const team = [
  { name: 'Abebe Girma', role: 'CEO & Co-founder', initials: 'AG' },
  { name: 'Tigist Yonas', role: 'CTO & Co-founder', initials: 'TY' },
  { name: 'Mikael Solomon', role: 'Head of Operations', initials: 'MS' },
  { name: 'Feven Alemu', role: 'Head of Community', initials: 'FA' },
]

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-72 flex items-center justify-center overflow-hidden" aria-label="About hero">
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
          alt="Ethiopian community members"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy-900/70" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="font-display text-4xl sm:text-5xl font-extrabold text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">Mission</span>
            <h2 className="font-display text-3xl font-bold text-navy-900 mt-2 mb-6">
              Connecting Ethiopia, one trip at a time
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              OmneRide was born from a simple frustration: sending a legal document from Addis Ababa to
              Bahir Dar reliably shouldn't take a week. Ethiopia has millions of intercity travellers
              making the same journeys every day — we simply put them to work for the community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We are a team of Ethiopians who believe the gig economy can be built locally, for local
              needs, with local values at its core. Our platform is designed around trust, transparency,
              and the unshakeable Ethiopian spirit of community — <em>ager hager</em>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-navy-900" aria-label="Our values" id="values">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="font-display text-3xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What drives us
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Icon size={24} className="text-gold-500 mb-4" aria-hidden="true" />
                <h3 className="font-display font-bold text-white mb-2">{title}</h3>
                <p className="text-navy-200 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white" aria-label="Team" id="team">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="font-display text-3xl font-bold text-navy-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Meet the team
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({ name, role, initials }, i) => (
              <motion.div
                key={name}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-20 h-20 rounded-full bg-navy-900 flex items-center justify-center text-gold-500 font-display font-bold text-xl mx-auto mb-3">
                  {initials}
                </div>
                <h3 className="font-display font-semibold text-navy-900">{name}</h3>
                <p className="text-gray-500 text-sm">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-16 bg-[#F8F9FC]" aria-label="Press" id="press">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-4" id="careers">Press & Careers</h2>
          <p className="text-gray-500 mb-6">
            We're always looking for mission-driven people. Send your CV to{' '}
            <a href="mailto:careers@omneride.et" className="text-navy-700 font-semibold hover:text-gold-600">
              careers@omneride.et
            </a>
          </p>
          <p className="text-gray-500">
            For press inquiries:{' '}
            <a href="mailto:press@omneride.et" className="text-navy-700 font-semibold hover:text-gold-600">
              press@omneride.et
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
