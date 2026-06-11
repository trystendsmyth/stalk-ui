import { fn } from 'storybook/test'
import { input as inputRecipe } from 'styled-system/recipes'

import { Input } from './input'
import { Label } from './label'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { size: SIZES, align: ALIGNS } = inputRecipe.variantMap

const meta = {
  title: 'Components/Forms/Input',
  component: Input,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Email',
    align: 'start',
    disabled: false,
    invalid: false,
    onChange: fn(),
    placeholder: 'hello@stalk-ui.com',
    size: 'md',
  },
  argTypes: {
    'aria-label': { control: 'text' },
    align: { control: 'inline-radio', options: ALIGNS },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    placeholder: { control: 'text' },
    size: { control: 'inline-radio', options: SIZES },
    type: { control: 'text' },
    className: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    endSlot: { table: { disable: true } },
    startSlot: { table: { disable: true } },
    rootProps: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Input aria-label="Small input" placeholder="Small" size="sm" />
      <Input aria-label="Medium input" placeholder="Medium" size="md" />
      <Input aria-label="Large input" placeholder="Large" size="lg" />
    </div>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Input aria-label="Default input" placeholder="Default" />
      <Input aria-label="Invalid input" invalid placeholder="Invalid" />
      <Input aria-label="Disabled input" disabled placeholder="Disabled" />
    </div>
  ),
}

export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="hello@stalk-ui.com" />
    </div>
  ),
}

export const WithSlots: Story = {
  parameters: { controls: { disable: true } },
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
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      <Input align="start" aria-label="Start aligned" defaultValue="Start" />
      <Input align="center" aria-label="Center aligned" defaultValue="Center" />
      <Input align="end" aria-label="End aligned" defaultValue="End" />
    </div>
  ),
}

export const Rtl: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div dir="rtl" style={{ maxWidth: 320 }}>
      <Input aria-label="البريد الإلكتروني" placeholder="البريد الإلكتروني" />
    </div>
  ),
}
