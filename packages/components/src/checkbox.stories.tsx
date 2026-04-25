import { Checkbox } from './checkbox'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    label: 'Accept terms',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox label="Default checkbox" />
      <Checkbox defaultChecked label="Checked checkbox" />
      <Checkbox invalid label="Invalid checkbox" />
      <Checkbox disabled label="Disabled checkbox" />
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Checkbox
      description="You can unsubscribe from product updates at any time."
      id="product-updates"
      label="Product updates"
    />
  ),
}

export const AlternateAccent: Story = {
  render: () => (
    <div data-accent-color="violet">
      <Checkbox defaultChecked label="Violet themed checkbox" />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <Checkbox label="قبول الشروط" />
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <Checkbox defaultChecked label="Dark checkbox" />
    </div>
  ),
}
