import { fn } from 'storybook/test'
import { HStack, VStack } from 'styled-system/jsx'

import { Avatar } from './avatar'
import { HoverCard } from './hover-card'
import { Link } from './link'
import { Text } from './text'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Overlay/Hover Card',
  component: HoverCard.Root,
  tags: ['autodocs', 'stable'],
  args: {
    closeDelay: 300,
    defaultOpen: false,
    onOpenChange: fn(),
    openDelay: 700,
  },
  argTypes: {
    children: { table: { disable: true } },
    closeDelay: { control: 'number' },
    defaultOpen: { control: 'boolean' },
    onOpenChange: { table: { disable: true } },
    open: { table: { disable: true } },
    openDelay: { control: 'number' },
  },
} satisfies Meta<typeof HoverCard.Root>

export default meta

type Story = StoryObj<typeof meta>

const Preview = () => (
  <HStack gap="12">
    <Avatar name="Ada Lovelace" />
    <VStack alignItems="flex-start" gap="2">
      <Text weight="medium">Ada Lovelace</Text>
      <Text size="bodySm">Mathematician and the first computer programmer.</Text>
    </VStack>
  </HStack>
)

export const Default: Story = {
  render: (args) => (
    <HoverCard.Root {...args}>
      <HoverCard.Trigger asChild>
        <Link href="#">@ada</Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Preview />
      </HoverCard.Content>
    </HoverCard.Root>
  ),
}

export const Open: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <HoverCard.Root {...args}>
      <HoverCard.Trigger asChild>
        <Link href="#">@ada</Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Preview />
      </HoverCard.Content>
    </HoverCard.Root>
  ),
}
