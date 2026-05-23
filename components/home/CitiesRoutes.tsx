'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const routes = [
  { from: 'Addis Ababa', to: 'Bahir Dar', popular: true },
  { from: 'Addis Ababa', to: 'Hawassa', popular: true },
  { from: 'Addis Ababa', to: 'Dire Dawa', popular: true },
  { from: 'Addis Ababa', to: 'Mekelle', popular: false },
  { from: 'Addis Ababa', to: 'Gondar', popular: false },
  { from: 'Bahir Dar', to: 'Gondar', popular: false },
  { from: 'Hawassa', to: 'Dire Dawa', popular: false },
  { from: 'Addis Ababa', to: 'Jimma', popular: false },
  { from: 'Addis Ababa', to: 'Adama', popular: true },
  { from: 'Addis Ababa', to: 'Dessie', popular: false },
]

export default function CitiesRoutes() {
  return (
    <section className="py-20 bg-white" aria-label="Cities and routes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">Coverage</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mt-2 mb-4">
            Routes across Ethiopia
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            We're launching on the most-travelled intercity corridors and expanding rapidly.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {routes.map(({ from, to, popular }) => (
            <motion.div
              key={`${from}-${to}`}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
              }}
            >
              <Link
                href="/cities"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  popular
                    ? 'bg-navy-900 text-white border-navy-900 hover:bg-navy-800'
                    : 'bg-white text-navy-700 border-gray-200 hover:border-navy-300 hover:bg-navy-50'
                }`}
              >
                {from}
                <ArrowRight size={14} aria-hidden="true" />
                {to}
                {popular && (
                  <span className="bg-gold-500 text-navy-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/cities"
            className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-gold-600 transition-colors"
          >
            View all cities & routes <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
