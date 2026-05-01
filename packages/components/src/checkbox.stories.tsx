import { useState } from 'react'
import { css } from 'styled-system/css'
import { HStack, VStack } from 'styled-system/jsx'
import { checkbox as checkboxRecipe } from 'styled-system/recipes'

import { Checkbox } from './checkbox'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = checkboxRecipe.variantMap

const labelStyle = css({ cursor: 'pointer' })
const disabledLabelStyle = css({ cursor: 'not-allowed', opacity: 0.5 })

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs', 'stable'],
  args: {
    disabled: false,
    invalid: false,
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
      description: 'Visual size of the checkbox.',
    },
    checked: {
      control: 'select',
      options: [undefined, true, false, 'indeterminate'],
      description: 'Checked state (controlled).',
    },
    defaultChecked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      description: 'Initial checked state (uncontrolled).',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox.',
    },
    invalid: {
      control: 'boolean',
      description: 'Mark the checkbox as invalid.',
    },
    asChild: { table: { disable: true } },
    onCheckedChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A checkbox with checked, unchecked, and indeterminate states. Built on Radix UI Checkbox.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Accept terms',
    defaultChecked: false,
  },
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="32" alignItems="flex-start">
      {SIZES.map((size) => (
        <VStack alignItems="center" gap="4" key={size}>
          <Checkbox aria-label={`${size} checkbox`} defaultChecked size={size} />
          <span>{size}</span>
        </VStack>
      ))}
    </HStack>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="flex-start" gap="12">
      <HStack gap="8">
        <Checkbox defaultChecked={false} id="cb-unchecked" />
        <label htmlFor="cb-unchecked">Unchecked</label>
      </HStack>
      <HStack gap="8">
        <Checkbox defaultChecked id="cb-checked" />
        <label htmlFor="cb-checked">Checked</label>
      </HStack>
      <HStack gap="8">
        <Checkbox checked="indeterminate" id="cb-indeterminate" />
        <label htmlFor="cb-indeterminate">Indeterminate</label>
      </HStack>
      <HStack gap="8">
        <Checkbox id="cb-invalid" invalid />
        <label htmlFor="cb-invalid">Invalid</label>
      </HStack>
      <HStack gap="8">
        <Checkbox disabled id="cb-disabled" />
        <label className={disabledLabelStyle} htmlFor="cb-disabled">
          Disabled
        </label>
      </HStack>
      <HStack gap="8">
        <Checkbox defaultChecked disabled id="cb-disabled-checked" />
        <label className={disabledLabelStyle} htmlFor="cb-disabled-checked">
          Disabled (checked)
        </label>
      </HStack>
    </VStack>
  ),
}

export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(true)
    return (
      <VStack alignItems="flex-start" gap="8">
        <Checkbox aria-label="Toggle option" checked={checked} onCheckedChange={setChecked} />
        <span>
          State: <strong>{String(checked)}</strong>
        </span>
      </VStack>
    )
  },
}

export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <HStack gap="8">
      <Checkbox id="terms" />
      <label className={labelStyle} htmlFor="terms">
        Accept terms and conditions
      </label>
    </HStack>
  ),
}
