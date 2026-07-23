'use client'

import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import { Color, TextStyle } from '@tiptap/extension-text-style'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Code,
  Italic,
  Link as LinkIcon,
  Redo2,
  Smile,
  Strikethrough,
  Underline,
  Undo2,
} from 'lucide-react'
import { createContext, forwardRef, useContext, useState } from 'react'
import { css, cx } from 'styled-system/css'
import { textEditor as textEditorRecipe } from 'styled-system/recipes'

import { Input } from './input'
import { Popover } from './popover'
import { SelectField } from './select'
import { Toolbar } from './toolbar'

import type { Editor, Extensions } from '@tiptap/core'
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react'

const styles = /* @__PURE__ */ textEditorRecipe()
const smStyles = /* @__PURE__ */ textEditorRecipe({ size: 'sm' })

const TextEditorContext = /* @__PURE__ */ createContext<Editor | null>(null)

const useTextEditorContext = (): Editor => {
  const editor = useContext(TextEditorContext)
  if (editor === null) throw new Error('TextEditor controls must render inside TextEditor.Root')
  return editor
}

const pressed = /* @__PURE__ */ css({ '&[aria-pressed=true]': { bgColor: 'bg.emphasized' } })

export interface TextEditorExtensionsOptions {
  /** Placeholder shown while the document is empty. */
  placeholder?: string | undefined
  /** Character limit surfaced by TextEditor.Counter. */
  characterLimit?: number | undefined
}

// The curated default extension set. Copied source: prune or extend freely —
// only what this array references ends up in the bundle.
export const textEditorExtensions = ({
  characterLimit,
  placeholder,
}: TextEditorExtensionsOptions = {}): Extensions => [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    link: { openOnClick: false },
  }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  TaskList,
  TaskItem.configure({ nested: true }),
  CharacterCount.configure(characterLimit === undefined ? {} : { limit: characterLimit }),
  ...(placeholder === undefined ? [] : [Placeholder.configure({ placeholder })]),
]

export interface UseTextEditorOptions extends TextEditorExtensionsOptions {
  /** Initial content (HTML or Tiptap JSON). */
  content?: string | object
  /** Accessible name for the editable region (the surface is role="textbox"). */
  label?: string
  /** Called with the editor after any document change. */
  onUpdate?: (editor: Editor) => void
  editable?: boolean
  /** Replaces the default extension set entirely. */
  extensions?: Extensions
}

// Editing never re-renders React (`shouldRerenderOnTransaction: false`);
// controls subscribe narrowly via useEditorState. SSR-safe for RSC consumers.
export const useTextEditor = ({
  characterLimit,
  content,
  editable = true,
  extensions,
  label,
  onUpdate,
  placeholder,
}: UseTextEditorOptions = {}): Editor | null =>
  useEditor({
    content: content ?? '',
    editable,
    extensions: extensions ?? textEditorExtensions({ characterLimit, placeholder }),
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    // Passing `attributes` replaces Tiptap's defaults, so restate the role.
    ...(label === undefined
      ? {}
      : { editorProps: { attributes: { 'aria-label': label, role: 'textbox' } } }),
    ...(onUpdate === undefined
      ? {}
      : {
          onUpdate: ({ editor }) => {
            onUpdate(editor)
          },
        }),
  })

export interface TextEditorRootProps extends HTMLAttributes<HTMLDivElement> {
  editor: Editor | null
  size?: 'sm' | 'md'
  invalid?: boolean
  disabled?: boolean
}

export const TextEditorRoot = /* @__PURE__ */ forwardRef<HTMLDivElement, TextEditorRootProps>(
  function TextEditorRoot(
    { children, className, disabled = false, editor, invalid = false, size = 'md', ...props },
    ref,
  ) {
    const slot = size === 'sm' ? smStyles : styles
    return (
      <TextEditorContext.Provider value={editor}>
        <div
          ref={ref}
          className={cx(slot.root, className)}
          data-disabled={disabled ? '' : undefined}
          data-invalid={invalid ? '' : undefined}
          {...props}
        >
          {editor === null ? null : children}
        </div>
      </TextEditorContext.Provider>
    )
  },
)

export const TextEditorToolbar = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Toolbar>
>(function TextEditorToolbar({ className, ...props }, ref) {
  return <Toolbar ref={ref} className={cx(styles.toolbar, className)} {...props} />
})

export interface TextEditorContentProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md'
}

export const TextEditorContent = /* @__PURE__ */ forwardRef<HTMLDivElement, TextEditorContentProps>(
  function TextEditorContent({ className, size = 'md', ...props }, ref) {
    const editor = useTextEditorContext()
    const slot = size === 'sm' ? smStyles : styles
    return (
      <EditorContent ref={ref} editor={editor} className={cx(slot.content, className)} {...props} />
    )
  },
)

export interface TextEditorBubbleMenuProps {
  children: ReactNode
  className?: string
  /** Accessible name for the floating toolbar. */
  label?: string
}

// Selection toolbar: mounts on text selection. Renders a real Toolbar so the
// controls get their roving focus group, tooltip provider, and toolbar role.
export const TextEditorBubbleMenu = ({
  children,
  className,
  label = 'Selection formatting',
}: TextEditorBubbleMenuProps) => {
  const editor = useTextEditorContext()
  return (
    <BubbleMenu editor={editor}>
      <Toolbar aria-label={label} className={cx(styles.bubble, className)}>
        {children}
      </Toolbar>
    </BubbleMenu>
  )
}

const MARKS = {
  bold: { icon: Bold, label: 'Bold', shortcut: '⌘B' },
  italic: { icon: Italic, label: 'Italic', shortcut: '⌘I' },
  underline: { icon: Underline, label: 'Underline', shortcut: '⌘U' },
  strike: { icon: Strikethrough, label: 'Strikethrough', shortcut: '⌘⇧S' },
  code: { icon: Code, label: 'Code', shortcut: '⌘E' },
} as const

export interface TextEditorMarkButtonProps {
  mark: keyof typeof MARKS
  /** Localized label override (defaults to English). */
  label?: string
}

export const TextEditorMarkButton = ({ label, mark }: TextEditorMarkButtonProps) => {
  const editor = useTextEditorContext()
  const active = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.isActive(mark),
  })
  const { icon: Icon, label: defaultLabel, shortcut } = MARKS[mark]
  const text = label ?? defaultLabel
  return (
    <Toolbar.Button
      aria-label={text}
      aria-pressed={active}
      className={pressed}
      tooltip={text}
      shortcut={shortcut}
      onClick={() => editor.chain().focus().toggleMark(mark).run()}
    >
      <Icon aria-hidden size={16} />
    </Toolbar.Button>
  )
}

const BLOCKS = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'bulletList', label: 'Bullet list' },
  { value: 'orderedList', label: 'Numbered list' },
  { value: 'taskList', label: 'Task list' },
  { value: 'blockquote', label: 'Quote' },
  { value: 'codeBlock', label: 'Code block' },
]

const activeBlock = (editor: Editor): string => {
  for (const level of [1, 2, 3]) {
    if (editor.isActive('heading', { level })) return `h${String(level)}`
  }
  for (const type of ['bulletList', 'orderedList', 'taskList', 'blockquote', 'codeBlock']) {
    if (editor.isActive(type)) return type
  }
  return 'paragraph'
}

export const TextEditorBlockSelect = ({ label = 'Block type' }: { label?: string }) => {
  const editor = useTextEditorContext()
  const value = useEditorState({ editor, selector: (ctx) => activeBlock(ctx.editor) })
  const apply = (next: string) => {
    const chain = editor.chain().focus()
    if (next === 'paragraph') chain.setParagraph().run()
    else if (next.startsWith('h')) chain.setHeading({ level: Number(next[1]) as 1 | 2 | 3 }).run()
    else if (next === 'bulletList') chain.toggleBulletList().run()
    else if (next === 'orderedList') chain.toggleOrderedList().run()
    else if (next === 'taskList') chain.toggleTaskList().run()
    else if (next === 'blockquote') chain.toggleBlockquote().run()
    else chain.toggleCodeBlock().run()
  }
  return (
    <SelectField
      aria-label={label}
      options={BLOCKS}
      size="sm"
      value={value}
      onValueChange={apply}
    />
  )
}

const ALIGNMENTS = [
  { value: 'left', label: 'Align left' },
  { value: 'center', label: 'Align center' },
  { value: 'right', label: 'Align right' },
  { value: 'justify', label: 'Justify' },
]

export const TextEditorAlignSelect = ({ label = 'Text alignment' }: { label?: string }) => {
  const editor = useTextEditorContext()
  const value = useEditorState({
    editor,
    selector: (ctx) =>
      ALIGNMENTS.find((a) => ctx.editor.isActive({ textAlign: a.value }))?.value ?? 'left',
  })
  return (
    <SelectField
      aria-label={label}
      options={ALIGNMENTS}
      size="sm"
      value={value}
      onValueChange={(next) => editor.chain().focus().setTextAlign(next).run()}
    />
  )
}

const DEFAULT_COLORS = [
  '#e5484d',
  '#f76b15',
  '#d9a521',
  '#2ea043',
  '#12a594',
  '#4f8cff',
  '#6e56cf',
  '#e93d82',
  '#8d8d8d',
]

export interface TextEditorColorButtonProps {
  /** `color` tints the text; `highlight` paints behind it. */
  target?: 'color' | 'highlight'
  colors?: readonly string[]
  label?: string
}

export const TextEditorColorButton = ({
  colors = DEFAULT_COLORS,
  label,
  target = 'color',
}: TextEditorColorButtonProps) => {
  const editor = useTextEditorContext()
  const text = label ?? (target === 'color' ? 'Text color' : 'Highlight')
  const apply = (value: string | null) => {
    const chain = editor.chain().focus()
    if (target === 'color') {
      if (value === null) chain.unsetColor().run()
      else chain.setColor(value).run()
    } else if (value === null) chain.unsetHighlight().run()
    else chain.setHighlight({ color: value }).run()
  }
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button aria-label={text} tooltip={text}>
          <span
            aria-hidden
            className={cx(
              css({ fontWeight: 'semibold', textDecoration: 'underline' }),
              target === 'highlight' ? css({ bgColor: 'highlight.subtle' }) : undefined,
            )}
          >
            A
          </span>
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content
        className={css({ display: 'flex', flexWrap: 'wrap', gap: '2', maxW: '176' })}
      >
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`${text}: ${color}`}
            className={styles.swatch}
            onClick={() => {
              apply(color)
            }}
          >
            <span
              aria-hidden
              className={css({ display: 'block', w: '18', h: '18', rounded: 'sm' })}
              style={{ background: color }}
            />
          </button>
        ))}
        <button
          type="button"
          className={cx(
            styles.swatch,
            css({ fontSize: 'xs', color: 'fg.subtle', w: 'auto', px: '8' }),
          )}
          onClick={() => {
            apply(null)
          }}
        >
          Clear
        </button>
      </Popover.Content>
    </Popover.Root>
  )
}

export const TextEditorLinkButton = ({ label = 'Link' }: { label?: string }) => {
  const editor = useTextEditorContext()
  const active = useEditorState({ editor, selector: (ctx) => ctx.editor.isActive('link') })
  const [href, setHref] = useState('')
  return (
    <Popover.Root
      onOpenChange={(open) => {
        if (open) setHref((editor.getAttributes('link').href as string | undefined) ?? '')
      }}
    >
      <Popover.Trigger asChild>
        <Toolbar.Button
          aria-label={label}
          aria-pressed={active}
          className={pressed}
          tooltip={label}
        >
          <LinkIcon aria-hidden size={16} />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content className={css({ display: 'flex', gap: '8', alignItems: 'center' })}>
        <Input
          size="sm"
          aria-label="Link URL"
          placeholder="https://…"
          value={href}
          onChange={(event) => {
            setHref(event.target.value)
          }}
        />
        <Popover.Close asChild>
          <Toolbar.Button
            aria-label="Set link"
            onClick={() => {
              if (href === '') editor.chain().focus().unsetLink().run()
              else editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
            }}
          >
            Set
          </Toolbar.Button>
        </Popover.Close>
      </Popover.Content>
    </Popover.Root>
  )
}

const DEFAULT_EMOJI =
  '😀 😄 😅 😂 🙂 😉 😍 🤔 😮 😢 😡 🥳 👍 👎 👀 🙏 💪 👋 🎉 🔥 ⭐ ✨ ✅ ❌ ⚠️ ❗ ❓ 💡 📌 📎 📝 📅 🕒 🚀 🐛 🔧 ⚡ 💬 💯 ❤️'.split(
    ' ',
  )

export interface TextEditorEmojiButtonProps {
  emoji?: readonly string[]
  label?: string
}

// Inserts plain Unicode — no extension, nothing to serialize specially.
export const TextEditorEmojiButton = ({
  emoji = DEFAULT_EMOJI,
  label = 'Emoji',
}: TextEditorEmojiButtonProps) => {
  const editor = useTextEditorContext()
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button aria-label={label} tooltip={label}>
          <Smile aria-hidden size={16} />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content
        className={css({ display: 'flex', flexWrap: 'wrap', gap: '2', maxW: '224' })}
      >
        {emoji.map((char) => (
          <Popover.Close asChild key={char}>
            <button
              type="button"
              aria-label={`${label}: ${char}`}
              className={styles.swatch}
              onClick={() => editor.chain().focus().insertContent(char).run()}
            >
              {char}
            </button>
          </Popover.Close>
        ))}
      </Popover.Content>
    </Popover.Root>
  )
}

export const TextEditorHistoryButtons = ({
  redoLabel = 'Redo',
  undoLabel = 'Undo',
}: {
  undoLabel?: string
  redoLabel?: string
}) => {
  const editor = useTextEditorContext()
  const state = useEditorState({
    editor,
    selector: (ctx) => ({ redo: ctx.editor.can().redo(), undo: ctx.editor.can().undo() }),
  })
  return (
    <>
      <Toolbar.Button
        aria-label={undoLabel}
        disabled={!state.undo}
        tooltip={undoLabel}
        shortcut="⌘Z"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 aria-hidden size={16} />
      </Toolbar.Button>
      <Toolbar.Button
        aria-label={redoLabel}
        disabled={!state.redo}
        tooltip={redoLabel}
        shortcut="⌘⇧Z"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 aria-hidden size={16} />
      </Toolbar.Button>
    </>
  )
}

export const TextEditorCounter = ({ limit }: { limit?: number }) => {
  const editor = useTextEditorContext()
  const count = useEditorState({
    editor,
    selector: (ctx) =>
      (ctx.editor.storage.characterCount as { characters: () => number }).characters(),
  })
  return (
    <div className={styles.counter}>
      {count}
      {limit === undefined ? '' : ` / ${String(limit)}`}
    </div>
  )
}

export const TextEditor = /* @__PURE__ */ Object.assign(TextEditorRoot, {
  AlignSelect: TextEditorAlignSelect,
  BlockSelect: TextEditorBlockSelect,
  BubbleMenu: TextEditorBubbleMenu,
  ColorButton: TextEditorColorButton,
  Content: TextEditorContent,
  Counter: TextEditorCounter,
  EmojiButton: TextEditorEmojiButton,
  HistoryButtons: TextEditorHistoryButtons,
  LinkButton: TextEditorLinkButton,
  MarkButton: TextEditorMarkButton,
  Root: TextEditorRoot,
  Toolbar: TextEditorToolbar,
})
