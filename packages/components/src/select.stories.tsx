import { Select } from './select'

import type { Meta, StoryObj } from '@storybook/react-vite'

const selectOptions = (
  <>
    <option value="">Choose a status</option>
    <option value="draft">Draft</option>
    <option value="published">Published</option>
    <option value="archived">Archived</option>
  </>
)

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    'aria-label': 'Status',
    children: selectOptions,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Select aria-label="Small select" size="sm">
        {selectOptions}
      </Select>
      <Select aria-label="Medium select" size="md">
        {selectOptions}
      </Select>
      <Select aria-label="Large select" size="lg">
        {selectOptions}
      </Select>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Select aria-label="Default select">{selectOptions}</Select>
      <Select invalid aria-label="Invalid select">
        {selectOptions}
      </Select>
      <Select disabled aria-label="Disabled select">
        {selectOptions}
      </Select>
    </div>
  ),
}

export const AlternateAccent: Story = {
  render: () => (
    <div data-accent-color="violet" style={{ maxWidth: 320 }}>
      <Select aria-label="Violet themed select">{selectOptions}</Select>
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl" style={{ maxWidth: 320 }}>
      <Select aria-label="الحالة">
        <option value="">اختر الحالة</option>
        <option value="draft">مسودة</option>
        <option value="published">منشور</option>
      </Select>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', maxWidth: 320, padding: 24 }}>
      <Select aria-label="Dark select">{selectOptions}</Select>
    </div>
  ),
}
