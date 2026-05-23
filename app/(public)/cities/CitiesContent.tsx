'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface Route {
  from: string
  to: string
  distance: string
  avgTime: string
  popular: boolean
  deliveries: number
}

const routes: Route[] = [
  { from: 'Addis Ababa', to: 'Bahir Dar', distance: '485 km', avgTime: '6–8 hrs', popular: true, deliveries: 340 },
  { from: 'Addis Ababa', to: 'Hawassa', distance: '275 km', avgTime: '3–4 hrs', popular: true, deliveries: 520 },
  { from: 'Addis Ababa', to: 'Dire Dawa', distance: '515 km', avgTime: '7–9 hrs', popular: true, deliveries: 290 },
  { from: 'Addis Ababa', to: 'Adama', distance: '99 km', avgTime: '1.5 hrs', popular: true, deliveries: 680 },
  { from: 'Addis Ababa', to: 'Mekelle', distance: '780 km', avgTime: '11–13 hrs', popular: false, deliveries: 180 },
  { from: 'Addis Ababa', to: 'Gondar', distance: '740 km', avgTime: '10–12 hrs', popular: false, deliveries: 155 },
  { from: 'Addis Ababa', to: 'Jimma', distance: '352 km', avgTime: '4–5 hrs', popular: false, deliveries: 210 },
  { from: 'Addis Ababa', to: 'Dessie', distance: '400 km', avgTime: '5–7 hrs', popular: false, deliveries: 140 },
  { from: 'Bahir Dar', to: 'Gondar', distance: '180 km', avgTime: '2–3 hrs', popular: false, deliveries: 95 },
  { from: 'Hawassa', to: 'Dire Dawa', distance: '390 km', avgTime: '5–6 hrs', popular: false, deliveries: 75 },
]

const cities = ['Addis Ababa', 'Bahir Dar', 'Hawassa', 'Dire Dawa', 'Adama', 'Mekelle', 'Gondar', 'Jimma', 'Dessie', 'Harar', 'Arba Minch', 'Shashamane']

export default function CitiesContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-12 bg-navy-900" aria-label="Cities hero">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Cities &amp; Routes
          </motion.h1>
          <motion.p
            className="text-navy-200 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            OmneRide covers {cities.length}+ cities across Ethiopia and growing.
          </motion.p>
        </div>
      </section>

      {/* City pills */}
      <section className="py-10 bg-[#F8F9FC] border-b border-gray-100" aria-label="Active cities">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-gold-500" /> Active Cities
          </h2>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <span
                key={city}
                className="bg-white border border-gray-200 text-navy-700 px-4 py-1.5 rounded-full text-sm font-medium"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Routes table */}
      <section className="py-16 bg-white" aria-label="Available routes">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-8">Available Routes</h2>

          <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm" aria-label="Delivery routes table">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="text-left py-3 px-4 font-semibold">Route</th>
                  <th className="text-left py-3 px-4 font-semibold">Distance</th>
                  <th className="text-left py-3 px-4 font-semibold hidden sm:table-cell">
                    <span className="flex items-center gap-1"><Clock size={13} /> Avg Time</span>
                  </th>
                  <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">
                    <span className="flex items-center gap-1"><TrendingUp size={13} /> Deliveries</span>
                  </th>
                  <th className="py-3 px-4" />
                </tr>
              </thead>
              <tbody>
                {routes.map(({ from, to, distance, avgTime, popular, deliveries }, i) => (
                  <motion.tr
                    key={`${from}-${to}`}
                    className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 font-medium text-navy-900">
                        {from} <ArrowRight size={14} className="text-gray-400" /> {to}
                        {popular && (
                          <span className="bg-gold-500/15 text-gold-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                            Popular
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">{distance}</td>
                    <td className="py-3.5 px-4 text-gray-500 hidden sm:table-cell">{avgTime}</td>
                    <td className="py-3.5 px-4 text-gray-500 hidden md:table-cell">{deliveries.toLocaleString()}+</td>
                    <td className="py-3.5 px-4">
                      <Link
                        href="/#waitlist"
                        className="text-navy-700 hover:text-gold-600 font-semibold text-xs whitespace-nowrap"
                      >
                        Send Now →
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Don't see your city?{' '}
            <Link href="/#waitlist" className="text-navy-700 hover:text-gold-600 font-semibold">
              Join the waitlist
            </Link>{' '}
            and vote for your route.
          </p>
        </div>
      </section>
    </>
  )
}
