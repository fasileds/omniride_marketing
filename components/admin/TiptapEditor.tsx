'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import {
  Bold, Italic, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code2, Link as LinkIcon,
  Image as ImageIcon, Undo, Redo
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  title: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={cn(
        'p-2 rounded-md text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
        active ? 'bg-navy-900 text-white' : 'text-gray-600 hover:bg-gray-100'
      )}
    >
      {children}
    </button>
  )
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: { HTMLAttributes: { class: 'bg-gray-900 text-gray-100 rounded-lg p-4 text-sm font-mono' } },
        blockquote: { HTMLAttributes: { class: 'border-l-4 border-gold-500 pl-4 italic text-gray-600 bg-gold-50 py-1' } },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-navy-700 underline hover:text-gold-600' } }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4 prose-headings:font-display prose-headings:text-navy-900 prose-a:text-navy-700 prose-blockquote:border-gold-500',
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false)
    }
  }, [content, editor])

  if (!editor) return null

  function addImage() {
    const url = window.prompt('Enter image URL:')
    if (url) editor?.chain().focus().setImage({ src: url }).run()
  }

  function setLink() {
    const prev = editor?.getAttributes('link').href as string | undefined
    const url = window.prompt('Enter URL:', prev ?? '')
    if (url === null) return
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden" aria-label="Blog post editor">
      {/* Sticky toolbar */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 px-3 py-2 flex flex-wrap gap-0.5" role="toolbar" aria-label="Text formatting">
        <ToolbarButton
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          <Bold size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          <Italic size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-1 self-center" aria-hidden="true" />

        <ToolbarButton
          title="Heading 1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
        >
          <Heading3 size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-1 self-center" aria-hidden="true" />

        <ToolbarButton
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          <List size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          <ListOrdered size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-1 self-center" aria-hidden="true" />

        <ToolbarButton
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        >
          <Quote size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Code Block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
        >
          <Code2 size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-1 self-center" aria-hidden="true" />

        <ToolbarButton title="Add Link" onClick={setLink} active={editor.isActive('link')}>
          <LinkIcon size={16} />
        </ToolbarButton>

        <ToolbarButton title="Insert Image by URL" onClick={addImage}>
          <ImageIcon size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-1 self-center" aria-hidden="true" />

        <ToolbarButton
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo size={16} />
        </ToolbarButton>

        <ToolbarButton
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo size={16} />
        </ToolbarButton>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} className="tiptap-editor bg-white" />
    </div>
  )
}
