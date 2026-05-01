import { css } from 'styled-system/css'
import { HStack, VStack } from 'styled-system/jsx'
import { radio as radioRecipe } from 'styled-system/recipes'

import { Radio } from './radio'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = radioRecipe.variantMap

const disabledLabelStyle = css({ cursor: 'not-allowed', opacity: 0.5 })
const fieldsetReset = css({ border: 'none', margin: 0, padding: 0 })
const legendStyle = css({ fontWeight: 'semibold', marginBlockEnd: '8' })

const meta = {
  title: 'Components/Radio',
  component: Radio.Item,
  tags: ['autodocs', 'stable'],
  args: {
    disabled: false,
    invalid: false,
    size: 'md',
    value: 'basic',
  },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
      description: 'Visual size of the radio.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the radio.',
    },
    invalid: {
      control: 'boolean',
      description: 'Mark the radio as invalid.',
    },
    asChild: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component: 'A radio button used inside a Radio.Root group. Built on Radix UI Radio Group.',
      },
    },
  },
} satisfies Meta<typeof Radio.Item>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Radio.Root defaultValue="basic" name="default-plan">
      <HStack gap="8">
        <Radio.Item {...args} id="default-basic" />
        <label htmlFor="default-basic">Basic</label>
      </HStack>
    </Radio.Root>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Radio.Root defaultValue="md" name="sizes">
      <VStack alignItems="flex-start" gap="12">
        {SIZES.map((size) => (
          <HStack gap="8" key={size}>
            <Radio.Item id={`size-${size}`} size={size} value={size} />
            <label htmlFor={`size-${size}`}>{size}</label>
          </HStack>
        ))}
      </VStack>
    </Radio.Root>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Radio.Root defaultValue="checked" name="states">
      <VStack alignItems="flex-start" gap="12">
        <HStack gap="8">
          <Radio.Item id="state-default" value="default" />
          <label htmlFor="state-default">Unchecked</label>
        </HStack>
        <HStack gap="8">
          <Radio.Item id="state-checked" value="checked" />
          <label htmlFor="state-checked">Checked</label>
        </HStack>
        <HStack gap="8">
          <Radio.Item id="state-invalid" invalid value="invalid" />
          <label htmlFor="state-invalid">Invalid</label>
        </HStack>
        <HStack gap="8">
          <Radio.Item disabled id="state-disabled" value="disabled" />
          <label className={disabledLabelStyle} htmlFor="state-disabled">
            Disabled
          </label>
        </HStack>
        <HStack gap="8">
          <Radio.Item disabled id="state-disabled-checked" value="disabled-checked" />
          <label className={disabledLabelStyle} htmlFor="state-disabled-checked">
            Disabled (unselected)
          </label>
        </HStack>
      </VStack>
    </Radio.Root>
  ),
}

export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <fieldset className={fieldsetReset}>
      <legend className={legendStyle}>Plan</legend>
      <Radio.Root defaultValue="pro" name="plan">
        <VStack alignItems="flex-start" gap="8">
          <HStack gap="8">
            <Radio.Item id="plan-basic" value="basic" />
            <label htmlFor="plan-basic">Basic</label>
          </HStack>
          <HStack gap="8">
            <Radio.Item id="plan-pro" value="pro" />
            <label htmlFor="plan-pro">Pro</label>
          </HStack>
          <HStack gap="8">
            <Radio.Item id="plan-enterprise" value="enterprise" />
            <label htmlFor="plan-enterprise">Enterprise</label>
          </HStack>
        </VStack>
      </Radio.Root>
    </fieldset>
  ),
}
