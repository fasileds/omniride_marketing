'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
  category: string
}

const faqs: FaqItem[] = [
  { category: 'General', q: 'What is OmneRide?', a: 'OmneRide is an Ethiopian peer-to-peer delivery platform that connects people who need to send items (documents, parcels, legal materials) between Ethiopian cities with verified travellers already making those journeys.' },
  { category: 'General', q: 'When will OmneRide launch?', a: 'We are launching in Addis Ababa in Q3 2025, with rapid expansion to Bahir Dar, Hawassa, and Dire Dawa in the following quarter. Join our waitlist to get priority access.' },
  { category: 'Senders', q: 'What can I send?', a: 'Documents, parcels up to 20kg, legal filings, gifts, electronics, and traditional goods. Prohibited items include cash, contraband, live animals, and hazardous materials.' },
  { category: 'Senders', q: 'How much does it cost?', a: 'Pricing is based on distance, weight, and urgency. Our flat-rate model is typically 60–80% cheaper than traditional couriers. You see the price upfront before confirming.' },
  { category: 'Senders', q: 'What if my item is lost or damaged?', a: 'All deliveries include our protection guarantee up to 10,000 ETB. For high-value items, you can add extra insurance at checkout.' },
  { category: 'Travellers', q: 'How do I earn with OmneRide?', a: 'Create a traveller profile, log your upcoming trip route and date, browse delivery requests on your route, accept the ones that fit, pick up before departure, and deliver on arrival. Earnings go to your wallet immediately.' },
  { category: 'Travellers', q: 'Do I need a special vehicle?', a: 'No. You just need to be making the trip anyway — by bus, minibus, or private vehicle. You carry items as hand luggage or checked baggage.' },
  { category: 'Safety', q: 'How do you verify travellers?', a: 'Every traveller submits a government-issued ID, a selfie, and a phone number. We run a background check and require 3 community references before approving their first delivery.', },
  { category: 'Safety', q: 'What are the community rules?', a: 'Both senders and travellers must respect agreed pickup/dropoff times, communicate promptly through the app, and keep items in the condition received. Violations result in suspension.', },
  { category: 'Payments', q: 'How do payments work?', a: 'Senders pay upfront via Telebirr, CBE Birr, or card. Funds are held in escrow and released to the traveller only after the recipient confirms delivery.' },
  { category: 'Payments', q: 'Can I get a refund?', a: 'Yes. If a traveller cancels within 2 hours of departure, you get a full refund within 24 hours. If no suitable traveller is found, you are refunded automatically.' },
]

const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))]

function FaqAccordion({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-navy-900 pr-4">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-gold-500"
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 text-sm leading-relaxed pb-4">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory)

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-12 bg-navy-900" aria-label="FAQ header">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h1
            className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-navy-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Can't find what you need? Email{' '}
            <a href="mailto:hello@omneride.et" className="text-gold-400 hover:text-gold-300">
              hello@omneride.et
            </a>
          </motion.p>
        </div>
      </section>

      {/* FAQ body */}
      <section className="py-16 bg-[#F8F9FC]" aria-label="FAQ list" id="safety">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="FAQ categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-navy-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-navy-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6" id="community">
            {filtered.map((item, i) => (
              <FaqAccordion
                key={item.q}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
