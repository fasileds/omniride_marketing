'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Users, TrendingUp, Clock } from 'lucide-react'

interface Stat {
  value: number
  suffix: string
  label: string
  description: string
  Icon: React.ElementType
  color: string
}

const stats: Stat[] = [
  { value: 12,   suffix: '+',   label: 'Ethiopian Cities',         description: 'Active launch corridors',    Icon: MapPin,      color: 'text-blue-500 bg-blue-50' },
  { value: 2400, suffix: '+',   label: 'Waitlist Members',         description: 'Growing every day',          Icon: Users,       color: 'text-gold-600 bg-amber-50' },
  { value: 98,   suffix: '%',   label: 'Delivery Success Rate',    description: 'Across all beta deliveries',  Icon: TrendingUp,  color: 'text-emerald-600 bg-emerald-50' },
  { value: 6,    suffix: 'hrs', label: 'Avg. Addis → Bahir Dar',  description: 'vs. 5–7 days via post',      Icon: Clock,       color: 'text-purple-600 bg-purple-50' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.floor(eased * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function StatsBar() {
  return (
    <section className="relative bg-white border-b border-gray-100 py-14" aria-label="Platform statistics">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ value, suffix, label, description, Icon, color }, i) => (
            <motion.div
              key={label}
              className="relative group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-gold-200 hover:shadow-lg hover:shadow-gold-500/5 transition-all duration-300">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={20} aria-hidden="true" />
                </div>

                {/* Number */}
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 mb-1 tabular-nums">
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>

                {/* Label */}
                <p className="font-semibold text-navy-800 text-sm mb-1">{label}</p>
                <p className="text-gray-400 text-xs">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
