import { Box, VStack } from 'styled-system/jsx'
import { label as labelRecipe } from 'styled-system/recipes'

import { Input } from './input'
import { Label } from './label'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = labelRecipe.variantMap

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs', 'stable'],
  args: {
    children: 'Email',
    htmlFor: 'email',
    size: 'md',
    required: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
  },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <VStack alignItems="stretch" gap="8" maxWidth="320">
      <Label {...args} />
      <Input id="email" placeholder="hello@stalk-ui.com" />
    </VStack>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="12">
      {SIZES.map((size) => (
        <Label key={size} size={size}>
          {`${size} label`}
        </Label>
      ))}
    </VStack>
  ),
}

export const Required: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box maxWidth="320">
      <VStack alignItems="stretch" gap="8">
        <Label required htmlFor="required-email">
          Email
        </Label>
        <Input id="required-email" placeholder="hello@stalk-ui.com" required />
      </VStack>
    </Box>
  ),
}
