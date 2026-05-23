'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, MapPin, UserCheck, Star, ArrowRight } from 'lucide-react'

const senderSteps = [
  {
    step: '01',
    Icon: Package,
    title: 'Post your delivery request',
    desc: 'Describe what you need to send, the destination city, and your ideal delivery date. No package? Legal documents work too.',
  },
  {
    step: '02',
    Icon: MapPin,
    title: 'Get matched with a traveller',
    desc: 'We surface verified travellers already heading your route. Browse profiles, ratings, and pick someone you trust.',
  },
  {
    step: '03',
    Icon: UserCheck,
    title: 'Hand off & track',
    desc: 'Meet at a safe agreed location, hand off your item, and track every checkpoint via SMS or the app.',
  },
  {
    step: '04',
    Icon: Star,
    title: 'Confirm & rate',
    desc: 'Once your recipient confirms delivery, payment releases to the traveller. Both parties rate each other.',
  },
]

const travellerSteps = [
  {
    step: '01',
    Icon: MapPin,
    title: 'Log your next trip',
    desc: 'Tell us your route and departure date. It takes 60 seconds.',
  },
  {
    step: '02',
    Icon: Package,
    title: 'Browse matching requests',
    desc: 'See delivery requests on your exact route and choose which ones fit your capacity.',
  },
  {
    step: '03',
    Icon: UserCheck,
    title: 'Pick up & deliver',
    desc: 'Collect the item before you leave, deliver it after you arrive. Easy.',
  },
  {
    step: '04',
    Icon: Star,
    title: 'Earn & grow your rating',
    desc: 'Payment lands in your wallet within minutes of confirmed delivery. Build your rep for more requests.',
  },
]

export default function HowItWorksContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden" aria-label="Page hero">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"
          alt="Traveller ready for intercity journey"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy-900/70" aria-hidden="true" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="font-display text-4xl sm:text-5xl font-extrabold text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h1>
          <motion.p
            className="text-navy-200 mt-3 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Simple steps for senders and travellers alike.
          </motion.p>
        </div>
      </section>

      {/* Sender steps */}
      <section className="py-20 bg-[#F8F9FC]" aria-label="Steps for senders">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-gold-500/15 text-gold-600 text-sm font-semibold px-3 py-1 rounded-full mb-3">For Senders</span>
            <h2 className="font-display text-3xl font-bold text-navy-900">Send anything, anywhere</h2>
          </motion.div>

          <div className="flex flex-col gap-8">
            {senderSteps.map(({ step, Icon, title, desc }, i) => (
              <motion.div
                key={step}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center">
                  <Icon size={24} className="text-gold-500" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-gold-500 text-xs font-bold uppercase tracking-widest">{step}</span>
                  <h3 className="font-display text-lg font-bold text-navy-900 mt-0.5 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-gold-500 via-navy-900 to-gold-500" aria-hidden="true" />

      {/* Traveller steps */}
      <section className="py-20 bg-navy-900" aria-label="Steps for travellers">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-white/10 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">For Travellers</span>
            <h2 className="font-display text-3xl font-bold text-white">Earn on every trip</h2>
          </motion.div>

          <div className="flex flex-col gap-8">
            {travellerSteps.map(({ step, Icon, title, desc }, i) => (
              <motion.div
                key={step}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Icon size={24} className="text-gold-500" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-gold-500 text-xs font-bold uppercase tracking-widest">{step}</span>
                  <h3 className="font-display text-lg font-bold text-white mt-0.5 mb-1">{title}</h3>
                  <p className="text-navy-200 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold-500" aria-label="Call to action">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-navy-800 mb-8">Join thousands on our waitlist and be first to access OmneRide.</p>
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 bg-navy-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-navy-800 transition-colors"
          >
            Join the Waitlist <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
