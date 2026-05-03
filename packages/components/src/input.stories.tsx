import { Input } from './input'
import { Label } from './label'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    'aria-label': 'Email',
    placeholder: 'hello@stalk-ui.com',
  },
  argTypes: {
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Input aria-label="Small input" placeholder="Small" size="sm" />
      <Input aria-label="Medium input" placeholder="Medium" size="md" />
      <Input aria-label="Large input" placeholder="Large" size="lg" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Input aria-label="Default input" placeholder="Default" />
      <Input aria-label="Invalid input" invalid placeholder="Invalid" />
      <Input aria-label="Disabled input" disabled placeholder="Disabled" />
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="hello@stalk-ui.com" />
    </div>
  ),
}

export const WithSlots: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Input.Root>
        <Input.Prefix>$</Input.Prefix>
        <Input.Field aria-label="Amount" defaultValue="125.00" />
        <Input.Suffix>USD</Input.Suffix>
      </Input.Root>
      <Input.Root>
        <Input.Field aria-label="Search" placeholder="Search components" />
        <Input.Suffix>
          <button
            aria-label="Clear search"
            onClick={() => {
              /* demo only */
            }}
            style={{ background: 'transparent', border: 0, color: 'inherit', cursor: 'pointer' }}
            type="button"
          >
            Clear
          </button>
        </Input.Suffix>
      </Input.Root>
    </div>
  ),
}

export const Alignments: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Input align="start" aria-label="Start aligned" defaultValue="Start" />
      <Input align="center" aria-label="Center aligned" defaultValue="Center" />
      <Input align="end" aria-label="End aligned" defaultValue="End" />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl" style={{ maxWidth: 320 }}>
      <Input aria-label="البريد الإلكتروني" placeholder="البريد الإلكتروني" />
    </div>
  ),
}
