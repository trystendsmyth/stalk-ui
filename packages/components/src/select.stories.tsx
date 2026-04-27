import { Select } from './select'

import type { SelectTriggerProps } from './select'
import type { Meta, StoryObj } from '@storybook/react-vite'

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
  args: {
    'aria-label': 'Status',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Select.Trigger>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <SelectExample {...args} />,
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <SelectExample aria-label="Small select" size="sm" />
      <SelectExample aria-label="Medium select" size="md" />
      <SelectExample aria-label="Large select" size="lg" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <SelectExample aria-label="Default select" />
      <SelectExample invalid aria-label="Invalid select" />
      <SelectExample disabled aria-label="Disabled select" />
    </div>
  ),
}

export const RainbowTheme: Story = {
  render: () => (
    <div data-panda-theme="rainbow" style={{ maxWidth: 320 }}>
      <SelectExample aria-label="Rainbow themed select" />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl" style={{ maxWidth: 320 }}>
      <Select.Root>
        <Select.Trigger aria-label="الحالة">
          <Select.Value placeholder="اختر الحالة" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="draft">مسودة</Select.Item>
          <Select.Item value="published">منشور</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', maxWidth: 320, padding: 24 }}>
      <SelectExample aria-label="Dark select" />
    </div>
  ),
}
