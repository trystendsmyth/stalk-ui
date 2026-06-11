import { HStack } from 'styled-system/jsx'
import { kbd as kbdRecipe } from 'styled-system/recipes'

import { Kbd } from './kbd'
import { Text } from './text'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = kbdRecipe.variantMap

const meta = {
  title: 'Components/Typography/Kbd',
  component: Kbd,
  tags: ['autodocs', 'stable'],
  args: {
    children: '⌘',
    size: 'md',
  },
  argTypes: {
    children: { control: 'text' },
    className: { table: { disable: true } },
    size: { control: 'inline-radio', options: SIZES },
  },
} satisfies Meta<typeof Kbd>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" gap="8">
      {SIZES.map((size) => (
        <Kbd key={size} size={size}>
          Esc
        </Kbd>
      ))}
    </HStack>
  ),
}

export const Shortcut: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Text>
      Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette.
    </Text>
  ),
}
