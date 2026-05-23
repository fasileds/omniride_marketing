import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/types'
import BlogTableClient from './BlogTableClient'

export const metadata = { title: 'Blog Posts' }

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  const posts = (data as BlogPost[]) ?? []

  return (
    <div className="p-8">
      <BlogTableClient initialPosts={posts} />
    </div>
  )
}
