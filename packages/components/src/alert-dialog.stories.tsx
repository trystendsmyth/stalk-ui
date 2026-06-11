import { fn } from 'storybook/test'

import { AlertDialog } from './alert-dialog'
import { Button } from './button'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Overlay/Alert Dialog',
  component: AlertDialog.Root,
  tags: ['autodocs', 'stable'],
  args: {
    defaultOpen: false,
    onOpenChange: fn(),
  },
  argTypes: {
    children: { table: { disable: true } },
    defaultOpen: { control: 'boolean' },
    onOpenChange: { table: { disable: true } },
    open: { table: { disable: true } },
  },
} satisfies Meta<typeof AlertDialog.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <AlertDialog.Root {...args}>
      <AlertDialog.Trigger asChild>
        <Button tone="danger" variant="outline">
          Delete project
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Delete this project?</AlertDialog.Title>
          <AlertDialog.Description>
            This permanently removes the project and all of its data. This action cannot be undone.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button tone="danger">Delete</Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

export const Open: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <AlertDialog.Root {...args}>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Discard changes?</AlertDialog.Title>
          <AlertDialog.Description>
            This story renders the alert dialog opened by default.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel asChild>
            <Button variant="outline">Keep editing</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button tone="danger">Discard</Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}
