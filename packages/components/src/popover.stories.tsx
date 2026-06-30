import { fn } from 'storybook/test'
import { VStack } from 'styled-system/jsx'

import { Button } from './button'
import { Popover } from './popover'

import type { Meta, StoryObj } from '@storybook/react-vite'

const CloseIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={14}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width={14}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

const meta = {
  title: 'Components/Overlay/Popover',
  component: Popover.Root,
  tags: ['autodocs', 'stable'],
  args: {
    defaultOpen: false,
    modal: false,
    onOpenChange: fn(),
  },
  argTypes: {
    children: { table: { disable: true } },
    defaultOpen: { control: 'boolean' },
    modal: { control: 'boolean' },
    onOpenChange: { table: { disable: true } },
    open: { table: { disable: true } },
  },
} satisfies Meta<typeof Popover.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Popover.Root {...args}>
      <Popover.Trigger asChild>
        <Button variant="outline">Open popover</Button>
      </Popover.Trigger>
      <Popover.Content aria-label="Project settings">
        <VStack alignItems="stretch" gap="8">
          <strong>Project settings</strong>
          <span>Adjust project metadata and quick actions.</span>
        </VStack>
      </Popover.Content>
    </Popover.Root>
  ),
}

export const Open: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Popover.Root {...args}>
      <Popover.Trigger asChild>
        <Button variant="outline">Open popover</Button>
      </Popover.Trigger>
      <Popover.Content aria-label="Open popover">
        This popover is open by default.
        <Popover.Close aria-label="Close popover">
          <CloseIcon />
        </Popover.Close>
      </Popover.Content>
    </Popover.Root>
  ),
}

// `scrollable` caps content to the available height and scrolls within (with
// overscroll containment) — for tall panels like filter lists.
export const Scrollable: Story = {
  render: (args) => (
    <Popover.Root {...args}>
      <Popover.Trigger asChild>
        <Button variant="outline">Open filters</Button>
      </Popover.Trigger>
      <Popover.Content aria-label="Filter options" scrollable>
        <VStack alignItems="stretch" gap="8">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i}>Option {i + 1}</span>
          ))}
        </VStack>
      </Popover.Content>
    </Popover.Root>
  ),
}
