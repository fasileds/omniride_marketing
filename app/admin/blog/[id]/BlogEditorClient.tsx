'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import slugify from 'slugify'
import { Save, Eye, EyeOff, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import type { BlogPost } from '@/types'

const TiptapEditor = dynamic(() => import('@/components/admin/TiptapEditor'), { ssr: false })

const CATEGORIES = ['General', 'Company News', 'Community', 'Guides', 'Safety', 'Technology']

interface Props {
  initialPost: BlogPost | null
  postId: string
}

export default function BlogEditorClient({ initialPost, postId }: Props) {
  const router = useRouter()
  const isNew = postId === 'new'

  const [title, setTitle] = useState(initialPost?.title ?? '')
  const [slug, setSlug] = useState(initialPost?.slug ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(initialPost?.cover_image_url ?? '')
  const [content, setContent] = useState(initialPost?.content ?? '')
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? '')
  const [category, setCategory] = useState(initialPost?.category ?? 'General')
  const [readTime, setReadTime] = useState(initialPost?.read_time_minutes ?? 3)
  const [featured, setFeatured] = useState(initialPost?.featured ?? false)
  const [published, setPublished] = useState(initialPost?.published ?? false)
  const [authorName, setAuthorName] = useState(initialPost?.author_name ?? 'OmneRide Team')
  const [metaTitle, setMetaTitle] = useState(initialPost?.meta_title ?? '')
  const [metaDesc, setMetaDesc] = useState(initialPost?.meta_description ?? '')
  const [seoOpen, setSeoOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentIdRef = useRef<string>(postId)

  function markDirty() { setIsDirty(true) }

  function handleTitleChange(v: string) {
    setTitle(v)
    if (!initialPost?.slug || isNew) {
      setSlug(slugify(v, { lower: true, strict: true }))
    }
    markDirty()
  }

  const save = useCallback(async (silent = false) => {
    if (!title.trim()) {
      if (!silent) toast.error('Please add a title before saving')
      return
    }
    setSaving(true)
    try {
      const payload = {
        title,
        slug,
        excerpt,
        content,
        cover_image_url: coverImageUrl,
        category,
        read_time_minutes: readTime,
        featured,
        published,
        author_name: authorName,
        meta_title: metaTitle || title,
        meta_description: metaDesc || excerpt,
      }
      let res: Response
      if (isNew || currentIdRef.current === 'new') {
        res = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const data = await res.json() as { id: string }
          currentIdRef.current = data.id
          router.replace(`/admin/blog/${data.id}`)
        }
      } else {
        res = await fetch(`/api/blog/${currentIdRef.current}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      if (!res.ok) {
        const { error } = await res.json() as { error?: string }
        throw new Error(error ?? 'Save failed')
      }
      setIsDirty(false)
      if (!silent) toast.success('Saved!')
      else toast.success('Auto-saved', { duration: 2000, id: 'autosave' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed'
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }, [title, slug, excerpt, content, coverImageUrl, category, readTime, featured, published, authorName, metaTitle, metaDesc, isNew, router])

  // Auto-save every 30 seconds when dirty
  useEffect(() => {
    if (!isDirty) return
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => { save(true) }, 30_000)
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current) }
  }, [isDirty, save])

  async function handlePublishToggle() {
    const next = !published
    setPublished(next)
    markDirty()
    await save(true)
    toast.success(next ? 'Post published!' : 'Post unpublished')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-navy-900 text-sm">
            {isNew ? 'New Post' : 'Edit Post'}
          </span>
          {isDirty && <span className="text-xs text-gray-400 italic">Unsaved changes</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => save(false)}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save
          </button>
          <button
            onClick={handlePublishToggle}
            disabled={saving}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
              published ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-navy-900 text-white hover:bg-navy-800'
            }`}
          >
            {published ? <><EyeOff size={14} /> Unpublish</> : <><Eye size={14} /> Publish</>}
          </button>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="flex gap-0 max-w-[1400px] mx-auto">
        {/* Left: editor — 2/3 */}
        <div className="flex-1 min-w-0 px-8 py-8">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title…"
            className="w-full text-3xl font-display font-bold text-navy-900 border-none outline-none bg-transparent placeholder:text-gray-300 mb-2"
            aria-label="Post title"
          />

          {/* Slug */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-gray-400">Slug:</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => { setSlug(e.target.value); markDirty() }}
              className="text-xs text-navy-600 bg-navy-50 border border-navy-100 px-2 py-1 rounded font-mono focus:outline-none focus:ring-1 focus:ring-navy-300"
              aria-label="Post slug"
            />
          </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => { setExcerpt(e.target.value); markDirty() }}
              rows={2}
              placeholder="Short description shown in listings…"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none"
              aria-label="Post excerpt"
            />
          </div>

          {/* Cover image */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Cover Image URL</label>
            <input
              type="url"
              value={coverImageUrl}
              onChange={(e) => { setCoverImageUrl(e.target.value); markDirty() }}
              placeholder="https://images.unsplash.com/…"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-300"
              aria-label="Cover image URL"
            />
            {coverImageUrl && (
              <div className="relative h-40 rounded-lg overflow-hidden mt-2 bg-gray-100">
                <Image
                  src={coverImageUrl}
                  alt="Cover preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* Tiptap */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Content</label>
            <TiptapEditor
              content={content}
              onChange={(html) => { setContent(html); markDirty() }}
            />
          </div>
        </div>

        {/* Right: sidebar — 1/3 */}
        <aside className="w-80 shrink-0 border-l border-gray-100 bg-white px-6 py-8 flex flex-col gap-6 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto">
          {/* Status */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Status</p>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${
                published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {published ? 'Published' : 'Draft'}
              </span>
              <button
                onClick={() => { setPublished(!published); markDirty() }}
                className="relative w-10 h-5 rounded-full transition-colors"
                style={{ backgroundColor: published ? '#059669' : '#d1d5db' }}
                aria-label={published ? 'Set to draft' : 'Set to published'}
                aria-checked={published}
                role="switch"
              >
                <span
                  className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                  style={{ transform: `translateX(${published ? '22px' : '2px'})` }}
                />
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => { setCategory(e.target.value); markDirty() }}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-300"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Read time */}
          <div>
            <label htmlFor="read_time" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Read Time (minutes)
            </label>
            <input
              id="read_time"
              type="number"
              min={1}
              max={60}
              value={readTime}
              onChange={(e) => { setReadTime(Number(e.target.value)); markDirty() }}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-300"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Author Name
            </label>
            <input
              id="author"
              type="text"
              value={authorName}
              onChange={(e) => { setAuthorName(e.target.value); markDirty() }}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-300"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => { setFeatured(e.target.checked); markDirty() }}
              className="w-4 h-4 accent-gold-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Featured Post
            </label>
          </div>

          {/* SEO Collapsible */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={() => setSeoOpen(!seoOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-gray-50 transition-colors"
              aria-expanded={seoOpen}
            >
              SEO Settings
              {seoOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {seoOpen && (
              <div className="px-4 pb-4 flex flex-col gap-4 border-t border-gray-100 pt-4">
                {/* Meta title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="meta_title" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Meta Title
                    </label>
                    <span className={`text-xs ${metaTitle.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                      {metaTitle.length}/60
                    </span>
                  </div>
                  <input
                    id="meta_title"
                    type="text"
                    value={metaTitle}
                    onChange={(e) => { setMetaTitle(e.target.value); markDirty() }}
                    maxLength={80}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-300"
                    placeholder={title}
                  />
                </div>

                {/* Meta description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="meta_desc" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Meta Description
                    </label>
                    <span className={`text-xs ${metaDesc.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                      {metaDesc.length}/160
                    </span>
                  </div>
                  <textarea
                    id="meta_desc"
                    value={metaDesc}
                    onChange={(e) => { setMetaDesc(e.target.value); markDirty() }}
                    maxLength={200}
                    rows={3}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none"
                    placeholder={excerpt}
                  />
                </div>

                {/* Google snippet preview */}
                {(metaTitle || title) && (
                  <div className="bg-gray-50 rounded-lg p-3 text-xs" aria-label="Google search preview">
                    <p className="text-[#1a0dab] font-medium truncate">{metaTitle || title}</p>
                    <p className="text-[#006621] text-[10px]">omneride.et › blog › {slug}</p>
                    <p className="text-gray-600 line-clamp-2 mt-0.5">{metaDesc || excerpt}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
