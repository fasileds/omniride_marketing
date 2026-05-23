import BlogEditorClient from '../[id]/BlogEditorClient'

export const metadata = { title: 'New Post' }

export default function NewBlogPostPage() {
  return <BlogEditorClient initialPost={null} postId="new" />
}
