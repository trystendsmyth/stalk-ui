import { css } from 'styled-system/css'

import { TextEditor, useTextEditor } from './text-editor'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Inputs/Text Editor',
  component: TextEditor.Root,
  tags: ['autodocs', 'stable'],
  // Every story owns its editor instance through useTextEditor, so args are
  // satisfied here and hidden from the controls table.
  args: { editor: null },
  argTypes: {
    children: { table: { disable: true } },
    editor: { table: { disable: true } },
  },
} satisfies Meta<typeof TextEditor.Root>

export default meta

type Story = StoryObj<typeof meta>

const frame = css({ w: '560px', maxW: 'full' })

const defaultContent =
  '<h2>Weekly update</h2><p>The <strong>editor</strong> ships with <em>marks</em>, block types, alignment, colors, and <a href="https://stalk-ui.com">links</a>.</p><ul><li>Draft the RFC</li><li>Review with the team</li></ul>'

const DefaultDemo = () => {
  const editor = useTextEditor({
    characterLimit: 500,
    content: defaultContent,
    label: 'Weekly update',
    placeholder: 'Write something…',
  })
  return (
    <div className={frame}>
      <TextEditor.Root editor={editor}>
        <TextEditor.Toolbar aria-label="Formatting">
          <TextEditor.BlockSelect />
          <TextEditor.MarkButton mark="bold" />
          <TextEditor.MarkButton mark="italic" />
          <TextEditor.MarkButton mark="underline" />
          <TextEditor.MarkButton mark="strike" />
          <TextEditor.MarkButton mark="code" />
          <TextEditor.AlignSelect />
          <TextEditor.ColorButton />
          <TextEditor.ColorButton target="highlight" />
          <TextEditor.LinkButton />
          <TextEditor.EmojiButton />
          <TextEditor.HistoryButtons />
        </TextEditor.Toolbar>
        <TextEditor.Content />
        <TextEditor.Counter limit={500} />
      </TextEditor.Root>
    </div>
  )
}

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => <DefaultDemo />,
}

const MinimalDemo = () => {
  const editor = useTextEditor({
    content: '<p>A minimal surface with just the two most common marks.</p>',
    label: 'Note',
  })
  return (
    <div className={frame}>
      <TextEditor.Root editor={editor}>
        <TextEditor.Toolbar aria-label="Formatting">
          <TextEditor.MarkButton mark="bold" />
          <TextEditor.MarkButton mark="italic" />
        </TextEditor.Toolbar>
        <TextEditor.Content />
      </TextEditor.Root>
    </div>
  )
}

export const Minimal: Story = {
  parameters: { controls: { disable: true } },
  render: () => <MinimalDemo />,
}

const BubbleDemo = () => {
  const editor = useTextEditor({
    content: '<p>Select some of this text to raise the bubble menu.</p>',
    label: 'Comment',
  })
  return (
    <div className={frame}>
      <TextEditor.Root editor={editor}>
        <TextEditor.Content />
        <TextEditor.BubbleMenu>
          <TextEditor.MarkButton mark="bold" />
          <TextEditor.MarkButton mark="italic" />
          <TextEditor.MarkButton mark="strike" />
        </TextEditor.BubbleMenu>
      </TextEditor.Root>
    </div>
  )
}

// Selection-driven formatting: the floating bar mounts on text selection.
export const Bubble: Story = {
  parameters: { controls: { disable: true } },
  render: () => <BubbleDemo />,
}

const SmallSizeDemo = () => {
  const editor = useTextEditor({
    content: '<p>The compact size for dense forms and sidebars.</p>',
    label: 'Reply',
  })
  return (
    <div className={frame}>
      <TextEditor.Root editor={editor} size="sm">
        <TextEditor.Toolbar aria-label="Formatting">
          <TextEditor.MarkButton mark="bold" />
          <TextEditor.MarkButton mark="italic" />
          <TextEditor.HistoryButtons />
        </TextEditor.Toolbar>
        <TextEditor.Content size="sm" />
      </TextEditor.Root>
    </div>
  )
}

export const SmallSize: Story = {
  parameters: { controls: { disable: true } },
  render: () => <SmallSizeDemo />,
}
