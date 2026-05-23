'use client'

import { motion } from 'framer-motion'
import { Shield, Star, Smartphone, UserCheck, Lock, HeadphonesIcon } from 'lucide-react'

const features = [
  { Icon: UserCheck, title: 'Verified Profiles',    desc: 'Every traveller is government ID-verified and community-rated before their first delivery.', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/20', iconBg: 'bg-blue-500/20 text-blue-400' },
  { Icon: Shield,    title: 'Insured Parcels',      desc: 'Items up to 10,000 ETB are covered by our in-app protection guarantee on every trip.',     color: 'from-gold-500/20 to-gold-600/10 border-gold-500/20', iconBg: 'bg-gold-500/20 text-gold-400' },
  { Icon: Smartphone,title: 'Real-Time Tracking',   desc: 'Live SMS and in-app checkpoint updates from pickup to delivery, every single time.',        color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20', iconBg: 'bg-emerald-500/20 text-emerald-400' },
  { Icon: Star,      title: 'Mutual Ratings',       desc: 'Senders and travellers rate each other after every delivery, building a trusted network.',   color: 'from-purple-500/20 to-purple-600/10 border-purple-500/20', iconBg: 'bg-purple-500/20 text-purple-400' },
  { Icon: Lock,      title: 'Escrow Payments',      desc: 'Funds are held securely and released to the traveller only after confirmed delivery.',       color: 'from-red-500/20 to-red-600/10 border-red-500/20', iconBg: 'bg-red-500/20 text-red-400' },
  { Icon: HeadphonesIcon, title: '24/7 Support',   desc: 'Our team is reachable via WhatsApp and phone around the clock for any issue or dispute.',    color: 'from-teal-500/20 to-teal-600/10 border-teal-500/20', iconBg: 'bg-teal-500/20 text-teal-400' },
]

export default function TrustSafety() {
  return (
    <section className="py-28 bg-navy-900 relative overflow-hidden" aria-label="Trust and safety">

      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold-500 font-bold text-sm uppercase tracking-[0.2em] mb-3">Trust & Safety</p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Safety is not a feature —<br className="hidden sm:block" />
            <span className="text-gold-400">it's our foundation</span>
          </h2>
          <p className="text-navy-300 text-lg max-w-xl mx-auto leading-relaxed">
            Every layer of OmniRide is built around protecting both senders and travellers from the first tap to final delivery.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ Icon, title, desc, color, iconBg }, i) => (
            <motion.div
              key={title}
              className={`relative rounded-2xl p-6 border bg-gradient-to-br ${color} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 cursor-default`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${iconBg}`}>
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-navy-300 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom proof bar */}
        <motion.div
          className="mt-16 bg-white/5 border border-white/10 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <p className="font-display text-xl font-bold text-white">Ready to send something important?</p>
            <p className="text-navy-300 text-sm mt-1">Join thousands already on the waitlist. No spam, just launch news.</p>
          </div>
          <a
            href="/#waitlist"
            className="shrink-0 inline-flex items-center gap-2 bg-gold-500 text-navy-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
          >
            Join Free →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
