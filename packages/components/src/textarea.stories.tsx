import { Box, VStack } from 'styled-system/jsx'
import { textarea as textareaRecipe } from 'styled-system/recipes'

import { Textarea } from './textarea'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = textareaRecipe.variantMap

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Message',
    placeholder: 'Write a message...',
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Box maxWidth="360">
      <Textarea {...args} />
    </Box>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" maxWidth="360">
      {SIZES.map((size) => (
        <Textarea key={size} aria-label={`${size} textarea`} placeholder={size} size={size} />
      ))}
    </VStack>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" maxWidth="360">
      <Textarea aria-label="Default textarea" placeholder="Default" />
      <Textarea aria-label="Invalid textarea" invalid placeholder="Invalid" />
      <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled" />
    </VStack>
  ),
}
