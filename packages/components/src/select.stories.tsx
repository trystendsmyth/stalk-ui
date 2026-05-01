import { Box, VStack } from 'styled-system/jsx'
import { select as selectRecipe } from 'styled-system/recipes'

import { Select } from './select'

import type { SelectTriggerProps } from './select'
import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES } = selectRecipe.variantMap

const SelectExample = ({
  'aria-label': ariaLabel = 'Status',
  disabled = false,
  invalid = false,
  size = 'md',
}: SelectTriggerProps) => (
  <Select.Root>
    <Select.Trigger aria-label={ariaLabel} disabled={disabled} invalid={invalid} size={size}>
      <Select.Value placeholder="Choose a status" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="draft">Draft</Select.Item>
      <Select.Item value="published">Published</Select.Item>
      <Select.Item value="archived">Archived</Select.Item>
    </Select.Content>
  </Select.Root>
)

const meta = {
  title: 'Components/Select',
  component: Select.Trigger,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Status',
    disabled: false,
    invalid: false,
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    asChild: { table: { disable: true } },
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
