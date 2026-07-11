import { Calendar, Settings, Smile, User } from 'lucide-react'
import { fn } from 'storybook/test'

import { Command } from './command'

import type { Meta, StoryObj } from '@storybook/react-vite'

const onSelect = fn()

const meta = {
  title: 'Components/Menus/Command',
  component: Command.Root,
  tags: ['autodocs', 'stable'],
  args: {
    label: 'Command menu',
  },
  argTypes: {
    asChild: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
    label: { control: 'text' },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof Command.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Command {...args} style={{ maxWidth: '24rem', border: '1px solid' }}>
      <Command.Input aria-label="Search commands" placeholder="Type a command or search…" />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item onSelect={onSelect}>
            <Calendar size={16} /> Calendar
          </Command.Item>
          <Command.Item onSelect={onSelect}>
            <Smile size={16} /> Search emoji
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Settings">
          <Command.Item onSelect={onSelect}>
            <User size={16} /> Profile
            <Command.Shortcut>⌘P</Command.Shortcut>
          </Command.Item>
          <Command.Item onSelect={onSelect}>
            <Settings size={16} /> Settings
            <Command.Shortcut>⌘S</Command.Shortcut>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  ),
}
