import { Button } from './button'
import { DropdownMenu } from './dropdown-menu'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Root,
  tags: ['autodocs', 'stable'],
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof DropdownMenu.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
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
  ),
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

export const Complex: Story = {
  render: () => (
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Project actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.CheckboxItem checked>Show sidebar</DropdownMenu.CheckboxItem>
        <DropdownMenu.RadioGroup value="compact">
          <DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="comfortable">Comfortable</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Export</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>PDF</DropdownMenu.Item>
            <DropdownMenu.Item>CSV</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}
