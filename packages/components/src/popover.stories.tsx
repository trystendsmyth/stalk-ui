import { Button } from './button'
import { Popover } from './popover'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Popover',
  component: Popover.Root,
} satisfies Meta<typeof Popover.Root>

export default meta

type Story = StoryObj<typeof meta>

const PopoverExample = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <Button variant="outline">Open popover</Button>
    </Popover.Trigger>
    <Popover.Content aria-label="Project settings">
      <div style={{ display: 'grid', gap: 8 }}>
        <strong>Project settings</strong>
        <span>Adjust project metadata and quick actions.</span>
      </div>
      <Popover.Close aria-label="Close popover">×</Popover.Close>
    </Popover.Content>
  </Popover.Root>
)

export const Default: Story = {
  render: () => <PopoverExample />,
}

export const Open: Story = {
  render: () => (
    <Popover.Root defaultOpen>
      <Popover.Trigger asChild>
        <Button variant="outline">Open popover</Button>
      </Popover.Trigger>
      <Popover.Content aria-label="Open popover">
        This popover is open by default.
        <Popover.Close aria-label="Close popover">×</Popover.Close>
      </Popover.Content>
    </Popover.Root>
  ),
}

export const RainbowTheme: Story = {
  render: () => (
    <div data-panda-theme="rainbow">
      <PopoverExample />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button variant="outline">فتح النافذة</Button>
        </Popover.Trigger>
        <Popover.Content aria-label="إعدادات المشروع">
          ضبط بيانات المشروع والإجراءات السريعة.
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <PopoverExample />
    </div>
  ),
}
