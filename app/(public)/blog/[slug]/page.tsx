import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import type { BlogPost } from '@/types'
import { formatDate } from '@/lib/utils'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return (data as BlogPost) ?? null
}

export async function generateStaticParams() {
  // Uses service client — no cookies() needed at build time
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true)
  return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : [],
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: { '@type': 'Person', name: post.author_name },
    publisher: {
      '@type': 'Organization',
      name: 'OmneRide',
      logo: { '@type': 'ImageObject', url: 'https://omneride.com/logo.png' },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cover */}
      {post.cover_image_url && (
        <div className="relative h-72 sm:h-96 w-full" aria-hidden="true">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-900/60" />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label={post.title}>
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy-700 mb-8 transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-gold-500/15 text-gold-600 text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={12} aria-hidden="true" />
            {formatDate(post.created_at)}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={12} aria-hidden="true" />
            {post.read_time_minutes} min read
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-navy-900 leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-2">{post.excerpt}</p>
        <p className="text-sm text-gray-400 mb-10">By {post.author_name}</p>

        <hr className="border-gray-100 mb-10" />

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy-900 prose-a:text-navy-700 prose-a:no-underline hover:prose-a:text-gold-600 prose-blockquote:border-gold-500 prose-blockquote:bg-gold-50 prose-blockquote:py-1 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: post.content }}
          aria-label="Article content"
        />

        <hr className="border-gray-100 mt-12 mb-8" />

        {/* Author box */}
        <div className="flex items-center gap-4 bg-navy-50 rounded-xl p-5">
          <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center text-gold-500 font-bold text-lg shrink-0" aria-hidden="true">
            {post.author_name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-navy-900">{post.author_name}</p>
            <p className="text-sm text-gray-500">OmneRide Team</p>
          </div>
        </div>
      </article>
    </>
  )
}
