import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/types'
import { formatDateShort } from '@/lib/utils'

async function getLatestPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)
  return (data as BlogPost[]) ?? []
}

export default async function BlogPreview() {
  const posts = await getLatestPosts()

  if (posts.length === 0) return null

  return (
    <section className="py-20 bg-white" aria-label="Latest blog posts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">Blog</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mt-2">
              Latest from OmniRide
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-navy-700 font-semibold hover:text-gold-600 transition-colors"
          >
            All posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-navy-100">
                  {post.cover_image_url && (
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <span className="absolute top-3 left-3 bg-navy-900/80 text-white text-xs px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span>{formatDateShort(post.created_at)}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} aria-hidden="true" />
                    {post.read_time_minutes} min read
                  </span>
                </div>

                <h3 className="font-display font-bold text-navy-900 text-lg leading-snug group-hover:text-gold-600 transition-colors mb-2">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-navy-700 font-semibold hover:text-gold-600 transition-colors"
          >
            All posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
