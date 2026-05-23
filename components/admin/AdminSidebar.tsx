'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Users, Activity, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard',  href: '/admin',          Icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog',      Icon: FileText },
  { label: 'Waitlist',   href: '/admin/waitlist',  Icon: Users },
  { label: 'API Logs',   href: '/admin/logs',      Icon: Activity },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    toast.success('Signed out')
    router.push('/admin/login')
  }

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-64 bg-navy-900 flex flex-col z-40"
      aria-label="Admin sidebar navigation"
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/admin" className="font-display text-xl font-bold text-white">
          <span className="text-gold-500">Omni</span>Ride
          <span className="ml-2 text-xs font-normal text-navy-300 bg-white/10 px-2 py-0.5 rounded-full">Admin</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4" aria-label="Admin navigation">
        <ul className="flex flex-col gap-1" role="list">
          {navItems.map(({ label, href, Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-navy-200 hover:bg-white/10 hover:text-white'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-navy-200 hover:bg-white/10 hover:text-white transition-colors w-full"
          aria-label="Sign out of admin"
        >
          <LogOut size={18} aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
