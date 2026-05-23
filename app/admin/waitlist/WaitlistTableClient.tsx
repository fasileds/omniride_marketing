'use client'

import { useState, useMemo } from 'react'
import { Download, Search } from 'lucide-react'
import type { WaitlistEntry } from '@/types'
import { formatDateShort } from '@/lib/utils'

interface Props { entries: WaitlistEntry[] }

const roleBadge: Record<string, string> = {
  traveller: 'bg-blue-100 text-blue-700',
  sender: 'bg-amber-100 text-amber-700',
  both: 'bg-purple-100 text-purple-700',
}

function exportCSV(entries: WaitlistEntry[]) {
  const headers = ['Full Name', 'Email', 'Phone', 'Role', 'Joined']
  const rows = entries.map((e) => [
    `"${e.full_name}"`,
    e.email,
    e.phone,
    e.role,
    new Date(e.created_at).toISOString(),
  ])
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `omniride-waitlist-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function WaitlistTableClient({ entries }: Props) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'traveller' | 'sender' | 'both'>('all')

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const matchSearch =
        !search ||
        e.full_name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.phone.includes(search)
      const matchRole = roleFilter === 'all' || e.role === roleFilter
      return matchSearch && matchRole
    })
  }, [entries, search, roleFilter])

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">Waitlist</h1>
          <p className="text-gray-500 text-sm mt-1">{entries.length} total signups</p>
        </div>
        <button
          onClick={() => exportCSV(filtered)}
          className="inline-flex items-center gap-2 bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy-800 transition-colors"
          aria-label="Export waitlist as CSV"
        >
          <Download size={15} />
          Export CSV ({filtered.length})
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-300"
            aria-label="Search waitlist"
          />
        </div>

        <div className="flex gap-2" role="group" aria-label="Filter by role">
          {(['all', 'traveller', 'sender', 'both'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                roleFilter === r ? 'bg-navy-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-navy-300'
              }`}
              aria-pressed={roleFilter === r}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Waitlist entries table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Phone</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry, i) => (
                <tr key={entry.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-900">{entry.full_name}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                    <a href={`mailto:${entry.email}`} className="hover:text-navy-700">
                      {entry.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{entry.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${roleBadge[entry.role]}`}>
                      {entry.role.charAt(0).toUpperCase() + entry.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
                    {formatDateShort(entry.created_at)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center text-gray-400">
                    {search || roleFilter !== 'all' ? 'No entries match your filters' : 'No waitlist signups yet'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
