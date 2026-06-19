import { VStack } from 'styled-system/jsx'

import { NumberInput } from './number-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/Number Input',
  component: NumberInput,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Quantity',
    defaultValue: 1,
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['stacked', 'split'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    step: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    hideStepper: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A numeric field with steppers and full keyboard support (↑/↓, PageUp/PageDown, ' +
          'Home/End). Clamps to min/max on blur and can format the displayed value via Intl.',
      },
    },
  },
} satisfies Meta<typeof NumberInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MinMaxStep: Story = {
  args: { defaultValue: 4, min: 0, max: 10, step: 2 },
}

export const Split: Story = {
  args: { 'aria-label': 'Quantity', defaultValue: 1, layout: 'split', min: 0, max: 99 },
}

export const Currency: Story = {
  args: {
    'aria-label': 'Price',
    defaultValue: 1999.5,
    formatOptions: { style: 'currency', currency: 'USD' },
    step: 0.5,
  },
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" w="14rem">
      <NumberInput aria-label="Invalid" defaultValue={3} invalid />
      <NumberInput aria-label="Disabled" defaultValue={3} disabled />
      <NumberInput aria-label="No stepper" defaultValue={3} hideStepper />
    </VStack>
  ),
}
