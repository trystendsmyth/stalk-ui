import { Button } from './button'
import { Tooltip } from './tooltip'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip.Root,
  tags: ['autodocs', 'stable'],
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof Tooltip.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Hover for help</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltips explain controls without taking focus.</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
}

export const Open: Story = {
  render: () => (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Open tooltip</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>This tooltip is open by default.</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
}
