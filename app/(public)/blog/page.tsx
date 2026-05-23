import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { BlogPost } from '@/types'
import { formatDateShort } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, stories, and updates from the OmneRide team on Ethiopian logistics, community travel, and the future of peer-to-peer delivery.',
  openGraph: { title: 'OmneRide Blog', description: 'Stories and insights from our team.' },
  twitter: { card: 'summary_large_image' },
}

async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  return (data as BlogPost[]) ?? []
}

export default async function BlogListPage() {
  const posts = await getAllPosts()
  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured || p.id !== featured?.id)

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-12 bg-navy-900" aria-label="Blog header">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">OmneRide Blog</h1>
          <p className="text-navy-200 max-w-md mx-auto">
            Stories, guides, and updates from Ethiopia's peer-to-peer delivery community.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F8F9FC]" aria-label="Blog posts">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <article className="mb-12 group" aria-label={`Featured: ${featured.title}`}>
                  <Link href={`/blog/${featured.slug}`}>
                    <div className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                      <div className="relative h-64 md:h-auto min-h-[280px] bg-navy-100">
                        {featured.cover_image_url && (
                          <Image
                            src={featured.cover_image_url}
                            alt={featured.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                        )}
                        <span className="absolute top-4 left-4 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-2">
                          {featured.category}
                        </span>
                        <h2 className="font-display text-2xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                          {featured.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>{featured.author_name}</span>
                          <span>&bull;</span>
                          <span>{formatDateShort(featured.created_at)}</span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} aria-hidden="true" />
                            {featured.read_time_minutes} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative h-48 bg-navy-100">
                          {post.cover_image_url && (
                            <Image
                              src={post.cover_image_url}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          )}
                          <span className="absolute top-3 left-3 bg-navy-900/80 text-white text-xs px-2.5 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                            <span>{formatDateShort(post.created_at)}</span>
                            <span>&bull;</span>
                            <Clock size={11} aria-hidden="true" />
                            <span>{post.read_time_minutes} min</span>
                          </div>
                          <h2 className="font-display font-bold text-navy-900 text-base leading-snug group-hover:text-gold-600 transition-colors mb-2">
                            {post.title}
                          </h2>
                          <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
