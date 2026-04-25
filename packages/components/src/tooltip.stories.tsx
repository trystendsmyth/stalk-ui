import { Button } from './button'
import { Tooltip } from './tooltip'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip.Root,
} satisfies Meta<typeof Tooltip.Root>

export default meta

type Story = StoryObj<typeof meta>

const TooltipExample = () => (
  <Tooltip.Provider delayDuration={0}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button variant="outline">Hover for help</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Tooltips explain controls without taking focus.</Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
)

export const Default: Story = {
  render: () => <TooltipExample />,
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

export const AlternateAccent: Story = {
  render: () => (
    <div data-accent-color="violet">
      <TooltipExample />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button variant="outline">مساعدة</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>يوضح التلميح عناصر التحكم.</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <TooltipExample />
    </div>
  ),
}
