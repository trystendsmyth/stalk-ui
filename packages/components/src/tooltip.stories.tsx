import { fn } from 'storybook/test'

import { Button } from './button'
import { Tooltip } from './tooltip'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

const SIDES = ['top', 'right', 'bottom', 'left'] as const

// `side` lives on Tooltip.Content, not the Root; expose it here and thread it
// into the Content in render so the control drives where the tooltip points.
type TooltipStoryProps = ComponentProps<typeof Tooltip.Root> & {
  side?: ComponentProps<typeof Tooltip.Content>['side']
}

const meta = {
  title: 'Components/Overlay/Tooltip',
  component: Tooltip.Root,
  tags: ['autodocs', 'stable'],
  args: {
    defaultOpen: false,
    delayDuration: 0,
    onOpenChange: fn(),
    side: 'top',
  },
  argTypes: {
    children: { table: { disable: true } },
    defaultOpen: { control: 'boolean' },
    delayDuration: { control: 'number' },
    onOpenChange: { table: { disable: true } },
    open: { table: { disable: true } },
    side: { control: 'select', options: SIDES },
  },
} satisfies Meta<TooltipStoryProps>

export default meta

type Story = StoryObj<TooltipStoryProps>

export const Default: Story = {
  render: ({ side, delayDuration, ...args }) => (
    <Tooltip.Provider delayDuration={delayDuration ?? 0}>
      <Tooltip.Root {...args}>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Hover for help</Button>
        </Tooltip.Trigger>
        <Tooltip.Content {...(side ? { side } : {})}>
          Tooltips explain controls without taking focus.
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
}

export const Open: Story = {
  args: { defaultOpen: true },
  render: ({ side, delayDuration, ...args }) => (
    <Tooltip.Provider delayDuration={delayDuration ?? 0}>
      <Tooltip.Root {...args}>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Open tooltip</Button>
        </Tooltip.Trigger>
        <Tooltip.Content {...(side ? { side } : {})}>
          This tooltip is open by default.
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
}
