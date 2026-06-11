import { useState } from 'react'
import { fn } from 'storybook/test'
import { Center } from 'styled-system/jsx'

import { ContextMenu } from './context-menu'

import type { Meta, StoryObj } from '@storybook/react-vite'

const onSelect = fn()

const meta = {
  title: 'Components/Navigation/ContextMenu',
  component: ContextMenu.Root,
  tags: ['autodocs', 'stable'],
  args: {
    dir: 'ltr',
    modal: true,
    onOpenChange: fn(),
  },
  argTypes: {
    children: { table: { disable: true } },
    dir: { control: 'inline-radio', options: ['ltr', 'rtl'] },
    modal: { control: 'boolean' },
    onOpenChange: { table: { disable: true } },
  },
  parameters: {
    layout: 'padded',
    docs: { story: { inline: false, iframeHeight: '360px' } },
  },
} satisfies Meta<typeof ContextMenu.Root>

export default meta

type Story = StoryObj<typeof meta>

// Centered, dashed drop-target for the right-click trigger. Used by every
// story below via `<ContextMenu.Trigger asChild>` so the radix span renders
// directly as this element (no wrapper layer).
const Target = (
  <Center
    border="2px dashed"
    borderColor="border"
    color="fg.subtle"
    fontSize="sm"
    h="120"
    rounded="md"
    userSelect="none"
    w="320"
  >
    Right click here
  </Center>
)

export const Default: Story = {
  render: (args) => (
    <Center minH="calc(100vh - 2rem)" w="full">
      <ContextMenu {...args}>
        <ContextMenu.Trigger asChild>{Target}</ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item onSelect={onSelect}>
            Back
            <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item disabled onSelect={onSelect}>
            Forward
            <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item onSelect={onSelect}>
            Reload
            <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>More tools</ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent>
                <ContextMenu.Item onSelect={onSelect}>Save page as…</ContextMenu.Item>
                <ContextMenu.Item onSelect={onSelect}>Create shortcut…</ContextMenu.Item>
                <ContextMenu.Item onSelect={onSelect}>Name window…</ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu>
    </Center>
  ),
}

export const WithCheckboxAndRadio: Story = {
  render: function Render(args) {
    const [showBookmarks, setShowBookmarks] = useState(true)
    const [position, setPosition] = useState('bottom')
    return (
      <Center minH="calc(100vh - 2rem)" w="full">
        <ContextMenu {...args}>
          <ContextMenu.Trigger asChild>{Target}</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Label>View</ContextMenu.Label>
            <ContextMenu.CheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
              Show bookmarks bar
            </ContextMenu.CheckboxItem>
            <ContextMenu.Separator />
            <ContextMenu.Label>Position</ContextMenu.Label>
            <ContextMenu.RadioGroup value={position} onValueChange={setPosition}>
              <ContextMenu.RadioItem value="top">Top</ContextMenu.RadioItem>
              <ContextMenu.RadioItem value="bottom">Bottom</ContextMenu.RadioItem>
            </ContextMenu.RadioGroup>
          </ContextMenu.Content>
        </ContextMenu>
      </Center>
    )
  },
}
