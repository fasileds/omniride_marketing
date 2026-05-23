'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import type { BlogPost } from '@/types'
import { formatDateShort } from '@/lib/utils'

interface Props { initialPosts: BlogPost[] }

export default function BlogTableClient({ initialPosts }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const router = useRouter()

  async function togglePublish(post: BlogPost) {
    setActionLoading(post.id)
    const res = await fetch(`/api/blog/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !post.published }),
    })
    if (res.ok) {
      setPosts((ps) => ps.map((p) => p.id === post.id ? { ...p, published: !p.published } : p))
      toast.success(!post.published ? 'Post published!' : 'Post set to draft')
    } else {
      toast.error('Failed to update post')
    }
    setActionLoading(null)
  }

  async function deletePost(id: string) {
    setActionLoading(id)
    const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setPosts((ps) => ps.filter((p) => p.id !== id))
      toast.success('Post deleted')
    } else {
      toast.error('Failed to delete post')
    }
    setDeleteId(null)
    setActionLoading(null)
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} posts total</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy-800 transition-colors"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Blog posts table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Post</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      <div className="relative w-12 h-9 rounded-md overflow-hidden bg-gray-100 shrink-0 hidden sm:block">
                        {post.cover_image_url && (
                          <Image
                            src={post.cover_image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-navy-900 truncate max-w-[200px]">
                          {post.title || <span className="text-gray-400 italic">Untitled</span>}
                        </p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{post.category}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    {post.featured && (
                      <span className="ml-1.5 text-xs px-2 py-1 rounded-full font-semibold bg-gold-100 text-gold-700">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
                    {formatDateShort(post.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {/* Edit */}
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="p-1.5 text-gray-500 hover:text-navy-700 hover:bg-navy-50 rounded-md transition-colors"
                        aria-label={`Edit ${post.title}`}
                      >
                        <Edit size={15} />
                      </Link>

                      {/* Toggle publish */}
                      <button
                        onClick={() => togglePublish(post)}
                        disabled={actionLoading === post.id}
                        className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors disabled:opacity-40"
                        aria-label={post.published ? 'Unpublish' : 'Publish'}
                      >
                        {post.published ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => setDeleteId(post.id)}
                        disabled={actionLoading === post.id}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-40"
                        aria-label={`Delete ${post.title}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center text-gray-400">
                    No posts yet.{' '}
                    <Link href="/admin/blog/new" className="text-navy-600 font-semibold hover:text-gold-600">
                      Create your first post →
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      {deleteId && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Confirm deletion"
        >
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h2 className="font-display text-lg font-bold text-navy-900 mb-2">Delete this post?</h2>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The post will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePost(deleteId)}
                disabled={!!actionLoading}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
