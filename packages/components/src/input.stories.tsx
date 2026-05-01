import { Box, VStack } from 'styled-system/jsx'
import { input as inputRecipe } from 'styled-system/recipes'

import { Input } from './input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = inputRecipe.variantMap

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Email',
    placeholder: 'hello@stalk-ui.com',
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Box maxWidth="320">
      <Input {...args} />
    </Box>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" maxWidth="320">
      {SIZES.map((size) => (
        <Input key={size} aria-label={`${size} input`} placeholder={size} size={size} />
      ))}
    </VStack>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" maxWidth="320">
      <Input aria-label="Default input" placeholder="Default" />
      <Input aria-label="Invalid input" invalid placeholder="Invalid" />
      <Input aria-label="Disabled input" disabled placeholder="Disabled" />
    </VStack>
  ),
}
