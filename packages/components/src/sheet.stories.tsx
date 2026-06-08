import { X } from 'lucide-react'
import { VStack } from 'styled-system/jsx'

import { Button } from './button'
import { Input } from './input'
import { Sheet } from './sheet'

import type { SheetSide } from './sheet'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Overlay/Sheet',
  component: Sheet.Root,
  tags: ['autodocs', 'stable'],
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof Sheet.Root>

export default meta

type Story = StoryObj<typeof meta>

const renderSheet = (side: SheetSide) => (
  <Sheet.Root>
    <Sheet.Trigger asChild>
      <Button>Open sheet</Button>
    </Sheet.Trigger>
    <Sheet.Content side={side}>
      <Sheet.Header>
        <Sheet.Title>Edit profile</Sheet.Title>
        <Sheet.Description>Update your details, then save to apply changes.</Sheet.Description>
      </Sheet.Header>
      <VStack alignItems="stretch" gap="8">
        <label htmlFor="sheet-name">Name</label>
        <Input id="sheet-name" defaultValue="Ada Lovelace" />
      </VStack>
      <Sheet.Footer>
        <Sheet.Close asChild>
          <Button variant="outline">Cancel</Button>
        </Sheet.Close>
        <Button>Save</Button>
      </Sheet.Footer>
      <Sheet.Close aria-label="Close">
        <X aria-hidden size={16} />
      </Sheet.Close>
    </Sheet.Content>
  </Sheet.Root>
)

export const Default: Story = {
  render: () => renderSheet('right'),
}

export const Left: Story = {
  render: () => renderSheet('left'),
}

export const Bottom: Story = {
  render: () => renderSheet('bottom'),
}

export const Open: Story = {
  render: () => (
    <Sheet.Root defaultOpen>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Notifications</Sheet.Title>
          <Sheet.Description>This story renders the sheet opened by default.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Close aria-label="Close">
          <X aria-hidden size={16} />
        </Sheet.Close>
      </Sheet.Content>
    </Sheet.Root>
  ),
}
