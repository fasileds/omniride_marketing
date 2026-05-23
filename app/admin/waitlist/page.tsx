import { createClient } from '@/lib/supabase/server'
import type { WaitlistEntry } from '@/types'
import WaitlistTableClient from './WaitlistTableClient'

export const metadata = { title: 'Waitlist' }

export default async function AdminWaitlistPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })

  const entries = (data as WaitlistEntry[]) ?? []

  return (
    <div className="p-8">
      <WaitlistTableClient entries={entries} />
    </div>
  )
}
