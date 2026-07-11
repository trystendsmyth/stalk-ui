import { useState } from 'react'
import { fn } from 'storybook/test'
import { css } from 'styled-system/css'
import { VStack } from 'styled-system/jsx'

import { Menubar } from './menubar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const onSelect = fn()

const status = css({
  bgColor: 'bg.subtle',
  color: 'fg.muted',
  fontSize: 'sm',
  px: '12',
  py: '8',
  rounded: 'sm',
})

const meta = {
  title: 'Components/Menus/Menubar',
  component: Menubar.Root,
  tags: ['autodocs', 'stable'],
  args: {
    dir: 'ltr',
    loop: false,
    onValueChange: fn(),
  },
  argTypes: {
    asChild: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    defaultValue: { control: 'text' },
    dir: { control: 'inline-radio', options: ['ltr', 'rtl'] },
    id: { table: { disable: true } },
    loop: { control: 'boolean' },
    onValueChange: { table: { disable: true } },
    style: { table: { disable: true } },
    value: { table: { disable: true } },
  },
} satisfies Meta<typeof Menubar.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [showBookmarks, setShowBookmarks] = useState(true)
    const [layout, setLayout] = useState('comfortable')
    return (
      <VStack alignItems="flex-start" gap="12">
        <Menubar {...args}>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item onSelect={onSelect}>
                New tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Item onSelect={onSelect}>
                New window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Separator />
              <Menubar.Item onSelect={onSelect}>Share</Menubar.Item>
              <Menubar.Separator />
              <Menubar.Item disabled onSelect={onSelect}>
                Print…
              </Menubar.Item>
            </Menubar.Content>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Item onSelect={onSelect}>
                Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Item onSelect={onSelect}>
                Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Separator />
              <Menubar.Sub>
                <Menubar.SubTrigger>Find</Menubar.SubTrigger>
                <Menubar.Portal>
                  <Menubar.SubContent>
                    <Menubar.Item onSelect={onSelect}>Search the web…</Menubar.Item>
                    <Menubar.Item onSelect={onSelect}>Find on page…</Menubar.Item>
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
