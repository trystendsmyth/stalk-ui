import { useState } from 'react'
import { css } from 'styled-system/css'
import { VStack } from 'styled-system/jsx'

import { Menubar } from './menubar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const status = css({
  bgColor: 'bg.subtle',
  color: 'fg.muted',
  fontSize: 'sm',
  px: '12',
  py: '8',
  rounded: 'sm',
})

const meta = {
  title: 'Components/Navigation/Menubar',
  component: Menubar.Root,
  tags: ['autodocs', 'stable'],
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof Menubar.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [showBookmarks, setShowBookmarks] = useState(true)
    const [layout, setLayout] = useState('comfortable')
    return (
      <VStack alignItems="flex-start" gap="12">
        <Menubar>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>
                New tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Item>
                New window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Separator />
              <Menubar.Item>Share</Menubar.Item>
              <Menubar.Separator />
              <Menubar.Item disabled>Print…</Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item>
                Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Item>
                Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Separator />
              <Menubar.Sub>
                <Menubar.SubTrigger>Find</Menubar.SubTrigger>
                <Menubar.Portal>
                  <Menubar.SubContent>
                    <Menubar.Item>Search the web…</Menubar.Item>
                    <Menubar.Item>Find on page…</Menubar.Item>
                  </Menubar.SubContent>
                </Menubar.Portal>
              </Menubar.Sub>
            </Menubar.Content>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>View</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Label>Preferences</Menubar.Label>
              <Menubar.CheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                Show bookmarks
              </Menubar.CheckboxItem>
              <Menubar.Separator />
              <Menubar.Label>Layout</Menubar.Label>
              <Menubar.RadioGroup value={layout} onValueChange={setLayout}>
                <Menubar.RadioItem value="compact">Compact</Menubar.RadioItem>
                <Menubar.RadioItem value="comfortable">Comfortable</Menubar.RadioItem>
              </Menubar.RadioGroup>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar>
        <span className={status}>
          Bookmarks: <strong>{showBookmarks ? 'on' : 'off'}</strong> · Layout:{' '}
          <strong>{layout}</strong>
        </span>
      </VStack>
    )
  },
}
