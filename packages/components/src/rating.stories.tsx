import { fn } from 'storybook/test'
import { VStack } from 'styled-system/jsx'

import { Rating } from './rating'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/Rating',
  component: Rating,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Quality',
    defaultValue: 3,
    disabled: false,
    max: 5,
    onChange: fn(),
    readOnly: false,
    size: 'md',
  },
  argTypes: {
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    defaultValue: { control: 'number' },
    disabled: { control: 'boolean' },
    itemLabel: { table: { disable: true } },
    max: { control: 'number' },
    onChange: { table: { disable: true } },
    readOnly: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    value: { table: { disable: true } },
  },
} satisfies Meta<typeof Rating>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="8">
      <Rating aria-label="Small" defaultValue={3} size="sm" />
      <Rating aria-label="Medium" defaultValue={3} size="md" />
      <Rating aria-label="Large" defaultValue={3} size="lg" />
    </VStack>
  ),
}

export const ReadOnly: Story = {
  args: { readOnly: true, value: 4 },
  parameters: { controls: { disable: true } },
}
