import { Radio } from './radio'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: {
    label: 'Basic',
    name: 'plan',
    value: 'basic',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Radio>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Radio label="Small radio" name="sizes" size="sm" value="sm" />
      <Radio label="Medium radio" name="sizes" size="md" value="md" />
      <Radio label="Large radio" name="sizes" size="lg" value="lg" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Radio label="Default radio" name="states" value="default" />
      <Radio defaultChecked label="Checked radio" name="states" value="checked" />
      <Radio invalid label="Invalid radio" name="invalid-state" value="invalid" />
      <Radio disabled label="Disabled radio" name="disabled-state" value="disabled" />
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Radio
      description="Best for small teams getting started with Stalk UI."
      id="plan-basic"
      label="Basic"
      name="described-plan"
      value="basic"
    />
  ),
}

export const AlternateAccent: Story = {
  render: () => (
    <div data-accent-color="violet">
      <Radio defaultChecked label="Violet themed radio" name="accent" value="violet" />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <Radio label="الخطة الأساسية" name="rtl-plan" value="basic" />
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <Radio defaultChecked label="Dark radio" name="dark-plan" value="dark" />
    </div>
  ),
}
