import { HStack, VStack } from 'styled-system/jsx'

import { Spinner } from './spinner'

import type { Meta, StoryObj } from '@storybook/react-vite'

const SIZES = ['sm', 'md', 'lg', 'xl'] as const

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs', 'stable'],
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
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
