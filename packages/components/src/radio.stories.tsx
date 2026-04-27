import { Radio } from './radio'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Radio',
  component: Radio.Item,
  args: {
    label: 'Basic',
    value: 'basic',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Radio.Item>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Radio.Root name="default-plan">
      <Radio.Item label="Basic" value="basic" />
    </Radio.Root>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Radio.Root name="sizes" style={{ display: 'grid', gap: 12 }}>
      <Radio.Item label="Small radio" size="sm" value="sm" />
      <Radio.Item label="Medium radio" size="md" value="md" />
      <Radio.Item label="Large radio" size="lg" value="lg" />
    </Radio.Root>
  ),
}

export const States: Story = {
  render: () => (
    <Radio.Root defaultValue="checked" name="states" style={{ display: 'grid', gap: 12 }}>
      <Radio.Item label="Default radio" value="default" />
      <Radio.Item label="Checked radio" value="checked" />
      <Radio.Item invalid label="Invalid radio" value="invalid" />
      <Radio.Item disabled label="Disabled radio" value="disabled" />
    </Radio.Root>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Radio.Root name="described-plan">
      <Radio.Item
        description="Best for small teams getting started with Stalk UI."
        id="plan-basic"
        label="Basic"
        value="basic"
      />
    </Radio.Root>
  ),
}

export const RainbowTheme: Story = {
  render: () => (
    <div data-panda-theme="rainbow">
      <Radio.Root defaultValue="rainbow" name="rainbow">
        <Radio.Item label="Rainbow themed radio" value="rainbow" />
      </Radio.Root>
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <Radio.Root name="rtl-plan">
        <Radio.Item label="الخطة الأساسية" value="basic" />
      </Radio.Root>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <Radio.Root defaultValue="dark" name="dark-plan">
        <Radio.Item label="Dark radio" value="dark" />
      </Radio.Root>
    </div>
  ),
}
