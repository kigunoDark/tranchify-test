import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered } from 'lucide-react'
import { Button } from './button'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside ml-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside ml-4',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'my-1',
          },
        },
        heading: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'min-h-[120px] p-4 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring',
      },
    },
  })

  if (!editor) {
    return (
      <div className="min-h-[120px] border rounded-md bg-background p-4 text-sm text-muted-foreground">
        Loading editor...
      </div>
    )
  }

  const toggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run()
  }

  const toggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run()
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-1 rounded-md border border-input bg-background p-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-secondary' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-secondary' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="mx-1 w-px bg-border" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleBulletList}
          className={editor.isActive('bulletList') ? 'bg-secondary' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleOrderedList}
          className={editor.isActive('orderedList') ? 'bg-secondary' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-md bg-background">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  )
}
