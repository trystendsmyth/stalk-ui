import { Button } from './button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outline', 'ghost', 'subtle'],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  args: {
    children: 'Create',
    leadingIcon: '+',
    trailingIcon: '->',
  },
}

export const AsChild: Story = {
  render: () => (
    <Button asChild variant="outline">
      <a href="https://stalk-ui.com">Open Stalk UI</a>
    </Button>
  ),
}

export const RainbowTheme: Story = {
  render: () => (
    <div data-panda-theme="rainbow">
      <Button>Rainbow button</Button>
    </div>
  ),
}

export const Rtl: Story = {
  parameters: {
    direction: 'rtl',
  },
  render: () => (
    <div dir="rtl">
      <Button trailingIcon="->">متابعة</Button>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <Button>Dark button</Button>
    </div>
  ),
}
