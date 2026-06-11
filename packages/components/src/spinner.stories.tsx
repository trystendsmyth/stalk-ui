import { HStack, VStack } from 'styled-system/jsx'
import { spinner as spinnerRecipe } from 'styled-system/recipes'

import { Spinner } from './spinner'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = spinnerRecipe.variantMap

const meta = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Loading',
    size: 'md',
  },
  argTypes: {
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    size: { control: 'select', options: SIZES },
  },
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="flex-end" gap="20">
      {SIZES.map((size) => (
        <VStack alignItems="center" gap="4" key={size}>
          <Spinner size={size} />
          <span>{size}</span>
        </VStack>
      ))}
    </HStack>
  ),
}

export const InheritsColor: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack alignItems="center" gap="20">
      <span style={{ color: 'var(--colors-accent-solid)' }}>
        <Spinner />
      </span>
      <span style={{ color: 'var(--colors-success-solid)' }}>
        <Spinner />
      </span>
      <span style={{ color: 'var(--colors-warning-solid)' }}>
        <Spinner />
      </span>
      <span style={{ color: 'var(--colors-danger-solid)' }}>
        <Spinner />
      </span>
    </HStack>
  ),
}

export const CustomLabel: Story = {
  args: {
    'aria-label': 'Saving changes',
  },
}
