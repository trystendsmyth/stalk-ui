import { Button } from './button'
import { DropdownMenu } from './dropdown-menu'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Root,
} satisfies Meta<typeof DropdownMenu.Root>

export default meta

type Story = StoryObj<typeof meta>

const DropdownExample = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <Button variant="outline">Open menu</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Label>Project</DropdownMenu.Label>
      <DropdownMenu.Item>
        Rename
        <DropdownMenu.Shortcut>⌘R</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
)

export const Default: Story = {
  render: () => <DropdownExample />,
}

export const Open: Story = {
  render: () => (
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Open menu</DropdownMenu.Label>
        <DropdownMenu.Item>First action</DropdownMenu.Item>
        <DropdownMenu.Item>Second action</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const AlternateAccent: Story = {
  render: () => (
    <div data-accent-color="violet">
      <DropdownExample />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">فتح القائمة</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>المشروع</DropdownMenu.Label>
          <DropdownMenu.Item>إعادة تسمية</DropdownMenu.Item>
          <DropdownMenu.Item>نسخ</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <DropdownExample />
    </div>
  ),
}
