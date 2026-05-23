import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/types'
import BlogEditorClient from './BlogEditorClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  return { title: id === 'new' ? 'New Post' : 'Edit Post' }
}

export default async function BlogEditorPage({ params }: Props) {
  const { id } = await params

  let post: BlogPost | null = null
  if (id !== 'new') {
    const supabase = await createClient()
    const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single()
    post = (data as BlogPost) ?? null
  }

  return <BlogEditorClient initialPost={post} postId={id} />
}
