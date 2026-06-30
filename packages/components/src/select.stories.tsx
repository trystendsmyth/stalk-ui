import { useState } from 'react'
import { fn } from 'storybook/test'
import { Box, VStack } from 'styled-system/jsx'
import { select as selectRecipe } from 'styled-system/recipes'

import { Select, SelectField } from './select'

import type { SelectTriggerProps } from './select'
import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = selectRecipe.variantMap

const onValueChange = fn()

const SelectExample = ({
  'aria-label': ariaLabel = 'Status',
  disabled = false,
  fullWidth = false,
  invalid = false,
  size = 'md',
}: SelectTriggerProps) => {
  const [value, setValue] = useState<string>()
  return (
    <Select.Root
      {...(value === undefined ? {} : { value })}
      onValueChange={(next) => {
        setValue(next)
        onValueChange(next)
      }}
    >
      <Select.Trigger
        aria-label={ariaLabel}
        disabled={disabled}
        fullWidth={fullWidth}
        invalid={invalid}
        size={size}
      >
        <Select.Value placeholder="Choose a status" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="draft">Draft</Select.Item>
        <Select.Item value="published">Published</Select.Item>
        <Select.Item value="archived">Archived</Select.Item>
      </Select.Content>
    </Select.Root>
  )
}

const meta = {
  title: 'Components/Forms/Select',
  component: Select.Trigger,
  tags: ['autodocs', 'stable'],
  // Render each story in its own fixed-height iframe in autodocs so opening a
  // (portalled, scroll-locking) dropdown can't reflow the shared docs page. The
  // global `layout: 'centered'` keeps the content centered inside that iframe.
  parameters: {
    docs: { story: { iframeHeight: '420px', inline: false } },
  },
  args: {
    'aria-label': 'Status',
    disabled: false,
    fullWidth: false,
    invalid: false,
    size: 'md',
  },
  argTypes: {
    'aria-label': { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    invalid: { control: 'boolean' },
    size: { control: 'select', options: SIZES },
    asChild: { table: { disable: true } },
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Select.Trigger>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Box maxWidth="320">
      <SelectExample {...args} />
    </Box>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" maxWidth="320">
      {SIZES.map((size) => (
        <SelectExample key={size} aria-label={`${size} select`} size={size} />
      ))}
    </VStack>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="stretch" gap="12" maxWidth="320">
      <SelectExample aria-label="Default select" />
      <SelectExample aria-label="Invalid select" invalid />
      <SelectExample aria-label="Disabled select" disabled />
    </VStack>
  ),
}

export const Grouped: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box maxWidth="320">
      <Select.Root>
        <Select.Trigger aria-label="Timezone">
          <Select.Value placeholder="Select a timezone" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>North America</Select.Label>
            <Select.Item value="est">Eastern (EST)</Select.Item>
            <Select.Item value="cst">Central (CST)</Select.Item>
            <Select.Item value="pst">Pacific (PST)</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Europe</Select.Label>
            <Select.Item value="gmt">Greenwich (GMT)</Select.Item>
            <Select.Item value="cet">Central European (CET)</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Box>
  ),
}

// SelectField: the convenience over the compound for the value/onChange/options
// case. The empty-value option is selectable via the built-in sentinel.
export const Field: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VStack alignItems="start" gap="12" maxWidth="320">
      <SelectField
        aria-label="Status"
        onValueChange={fn()}
        options={[
          { label: 'Any status', value: '' },
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
          { label: 'Archived', value: 'archived' },
        ]}
        placeholder="Choose a status"
      />
      <SelectField
        aria-label="Status, full width"
        fullWidth
        onValueChange={fn()}
        options={[
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
        ]}
        placeholder="Full-width trigger"
      />
    </VStack>
  ),
}
