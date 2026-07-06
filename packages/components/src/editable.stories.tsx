import { fn } from 'storybook/test'

import { Editable } from './editable'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/Editable',
  component: Editable,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Project name',
    defaultValue: 'Untitled project',
    disabled: false,
    onSubmit: fn(),
    placeholder: 'Enter a value',
  },
  argTypes: {
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    defaultValue: { control: 'text' },
    disabled: { control: 'boolean' },
    onSubmit: { table: { disable: true } },
    placeholder: { control: 'text' },
    value: { table: { disable: true } },
  },
} satisfies Meta<typeof Editable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
  args: { defaultValue: '', placeholder: 'Add a note…' },
}
