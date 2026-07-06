import { X } from 'lucide-react'
import { fn } from 'storybook/test'
import { VStack } from 'styled-system/jsx'
import { sheet as sheetRecipe } from 'styled-system/recipes'

import { Button } from './button'
import { Input } from './input'
import { Sheet } from './sheet'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

const { side: SIDES } = sheetRecipe.variantMap

// `side` lives on Sheet.Content, not the Root; expose it here and thread it
// into the Content in render so the control drives the panel anchor edge.
type SheetStoryProps = ComponentProps<typeof Sheet.Root> & {
  side?: ComponentProps<typeof Sheet.Content>['side']
}

const meta = {
  title: 'Components/Overlay/Sheet',
  component: Sheet.Root,
  tags: ['autodocs', 'stable'],
  parameters: {
    docs: {
      description: {
        component:
          'Edge-anchored panel with dialog semantics (built on Radix Dialog), for secondary content or forms on any pointer type. Use Drawer instead when you want a gesture-driven mobile bottom sheet with drag-to-dismiss.',
      },
    },
  },
  args: {
    defaultOpen: false,
    modal: true,
    onOpenChange: fn(),
    side: 'right',
  },
  argTypes: {
    children: { table: { disable: true } },
    defaultOpen: { control: 'boolean' },
    modal: { control: 'boolean' },
    onOpenChange: { table: { disable: true } },
    open: { table: { disable: true } },
    side: { control: 'select', options: SIDES },
  },
  render: ({ side, ...args }) => (
    <Sheet.Root {...args}>
      <Sheet.Trigger asChild>
        <Button>Open sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content {...(side ? { side } : {})}>
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
  ),
} satisfies Meta<SheetStoryProps>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Left: Story = {
  args: { side: 'left' },
}

export const Bottom: Story = {
  args: { side: 'bottom' },
}

export const Open: Story = {
  args: { defaultOpen: true },
  render: ({ side, ...args }) => (
    <Sheet.Root {...args}>
      <Sheet.Content {...(side ? { side } : {})}>
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
