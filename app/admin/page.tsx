import { createClient } from '@/lib/supabase/server'
import StatCard from '@/components/admin/StatCard'
import { Users, FileText, Edit3, Calendar } from 'lucide-react'
import type { WaitlistEntry, BlogPost } from '@/types'
import { formatDateShort, isThisWeek } from '@/lib/utils'
import Link from 'next/link'

export const metadata = { title: 'Dashboard' }

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { data: waitlist },
    { data: posts },
  ] = await Promise.all([
    supabase.from('waitlist').select('*').order('created_at', { ascending: false }),
    supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
  ])

  const allWaitlist = (waitlist as WaitlistEntry[]) ?? []
  const allPosts = (posts as BlogPost[]) ?? []

  const totalWaitlist = allWaitlist.length
  const publishedPosts = allPosts.filter((p) => p.published).length
  const draftPosts = allPosts.filter((p) => !p.published).length
  const thisWeekSignups = allWaitlist.filter((w) => isThisWeek(w.created_at)).length

  const recentSignups = allWaitlist.slice(0, 8)
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of OmniRide platform activity</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Waitlist" value={totalWaitlist} Icon={Users} color="navy" />
        <StatCard label="Published Posts" value={publishedPosts} Icon={FileText} color="green" />
        <StatCard label="Draft Posts" value={draftPosts} Icon={Edit3} color="gold" />
        <StatCard label="This Week's Signups" value={thisWeekSignups} Icon={Calendar} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent signups */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-display font-bold text-navy-900">Recent Signups</h2>
            <Link href="/admin/waitlist" className="text-xs text-navy-600 hover:text-gold-600 font-semibold">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Recent waitlist signups">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Role</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSignups.map((entry) => (
                  <tr key={entry.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-navy-900">{entry.full_name}</p>
                      <p className="text-gray-400 text-xs">{entry.email}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        entry.role === 'sender' ? 'bg-amber-100 text-amber-700'
                        : entry.role === 'traveller' ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                      }`}>
                        {entry.role.charAt(0).toUpperCase() + entry.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">
                      {formatDateShort(entry.created_at)}
                    </td>
                  </tr>
                ))}
                {recentSignups.length === 0 && (
                  <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-400">No signups yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-display font-bold text-navy-900">Recent Posts</h2>
            <Link href="/admin/blog" className="text-xs text-navy-600 hover:text-gold-600 font-semibold">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentPosts.map((post) => (
              <div key={post.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-navy-900 text-sm truncate">{post.title || 'Untitled'}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{post.category} · {formatDateShort(post.created_at)}</p>
                </div>
                <span className={`shrink-0 text-xs px-2 py-1 rounded-full font-semibold ${
                  post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="shrink-0 text-xs text-navy-600 hover:text-gold-600 font-semibold"
                >
                  Edit →
                </Link>
              </div>
            ))}
            {recentPosts.length === 0 && (
              <p className="px-6 py-8 text-center text-gray-400 text-sm">No posts yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
