import { act, render, screen, waitFor } from '@testing-library/react'
import { useEffect } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { TextEditor, useTextEditor } from './text-editor'

import type { Editor } from '@tiptap/core'

// jsdom cannot type into contenteditable, so the tests drive the editor API
// directly. `useTextEditor` sets `immediatelyRender: false`, so the editor is
// null on the first render — every assertion waits for the mounted instance.
const Harness = ({ onEditor }: { onEditor: (editor: Editor) => void }) => {
  const editor = useTextEditor({ content: '<p>Hello</p>', label: 'Message' })
  useEffect(() => {
    if (editor !== null) onEditor(editor)
  }, [editor, onEditor])
  return (
    <TextEditor.Root editor={editor}>
      <TextEditor.Toolbar aria-label="Formatting">
        <TextEditor.MarkButton mark="bold" />
        <TextEditor.HistoryButtons />
      </TextEditor.Toolbar>
      <TextEditor.Content />
      <TextEditor.Counter />
    </TextEditor.Root>
  )
}

const renderEditor = async () => {
  const holder: { editor: Editor | null } = { editor: null }
  const view = render(
    <Harness
      onEditor={(editor) => {
        holder.editor = editor
      }}
    />,
  )
  await screen.findByText('Hello')
  await waitFor(() => {
    expect(holder.editor).not.toBeNull()
  })
  if (holder.editor === null) throw new Error('editor did not mount')
  return { editor: holder.editor, view }
}

test('renders content, toolbar, and counter without axe violations', async () => {
  const { view } = await renderEditor()

  expect(screen.getByRole('toolbar', { name: 'Formatting' })).toBeInTheDocument()
  expect(screen.getByRole('textbox', { name: 'Message' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Undo' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Redo' })).toBeDisabled()
  expect((await axe(view.container)).violations).toHaveLength(0)
})

test('toggling bold through the editor API presses the Bold button', async () => {
  const { editor } = await renderEditor()
  const bold = screen.getByRole('button', { name: 'Bold' })
  expect(bold).toHaveAttribute('aria-pressed', 'false')

  act(() => {
    editor.chain().focus().selectAll().toggleBold().run()
  })

  await waitFor(() => {
    expect(bold).toHaveAttribute('aria-pressed', 'true')
  })
})

test('the bold toggle marks the document HTML', async () => {
  const { editor } = await renderEditor()

  act(() => {
    editor.chain().focus().selectAll().toggleBold().run()
  })

  await waitFor(() => {
    expect(editor.getHTML()).toContain('<strong>')
  })
})

test('Counter reflects the character count', async () => {
  await renderEditor()

  // 'Hello' is five characters.
  expect(screen.getByText('5')).toBeInTheDocument()
})
