import { HStack, VStack } from 'styled-system/jsx'
import { skeleton as skeletonRecipe } from 'styled-system/recipes'

import { Skeleton } from './skeleton'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { radius: RADII } = skeletonRecipe.variantMap

const meta = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs', 'stable'],
  args: {
    radius: 'md',
  },
  argTypes: {
    className: { table: { disable: true } },
    radius: { control: 'select', options: RADII },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Skeleton {...args} style={{ height: 16, width: 240 }} />,
}

export const Card: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="flex-start" gap="12">
      <Skeleton radius="full" style={{ height: 48, width: 48 }} />
      <VStack alignItems="stretch" gap="8" w="240px">
        <Skeleton style={{ height: 14 }} />
        <Skeleton style={{ height: 14, width: '70%' }} />
        <Skeleton style={{ height: 14, width: '40%' }} />
      </VStack>
    </HStack>
  ),
}
