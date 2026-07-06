import { fn } from 'storybook/test'

import { FileUpload } from './file-upload'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/File Upload',
  component: FileUpload,
  tags: ['autodocs', 'stable'],
  args: {
    accept: '.csv,application/json',
    disabled: false,
    hint: 'CSV or JSON, up to 1 MB',
    maxSize: 1_048_576,
    multiple: true,
    onFilesChange: fn(),
    onReject: fn(),
  },
  argTypes: {
    accept: { control: 'text' },
    className: { table: { disable: true } },
    disabled: { control: 'boolean' },
    hint: { control: 'text' },
    label: { control: 'text' },
    maxSize: { control: 'number' },
    multiple: { control: 'boolean' },
    onFilesChange: { table: { disable: true } },
    onReject: { table: { disable: true } },
    removeLabel: { table: { disable: true } },
  },
} satisfies Meta<typeof FileUpload>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Single: Story = {
  args: { hint: 'One image', accept: 'image/*', multiple: false },
  parameters: { controls: { disable: true } },
}
