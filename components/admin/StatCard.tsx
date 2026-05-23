import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number | string
  Icon: LucideIcon
  color?: 'navy' | 'gold' | 'green' | 'purple'
}

const colorMap = {
  navy: 'bg-navy-50 text-navy-600',
  gold: 'bg-amber-50 text-amber-600',
  green: 'bg-emerald-50 text-emerald-600',
  purple: 'bg-purple-50 text-purple-600',
}

export default function StatCard({ label, value, Icon, color = 'navy' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>
      <p className="font-display text-3xl font-bold text-navy-900">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  )
}
