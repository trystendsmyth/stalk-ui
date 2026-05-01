import { VStack } from 'styled-system/jsx'

import { Button } from './button'
import { Dialog } from './dialog'
import { Input } from './input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  tags: ['autodocs', 'stable'],
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof Dialog.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Invite collaborators</Dialog.Title>
          <Dialog.Description>
            Share this project with teammates and manage who can edit it.
          </Dialog.Description>
        </Dialog.Header>
        <VStack alignItems="stretch" gap="8">
          <label htmlFor="dialog-email">Email</label>
          <Input id="dialog-email" placeholder="teammate@stalk-ui.com" type="email" />
        </VStack>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Button>Send invite</Button>
        </Dialog.Footer>
        <Dialog.Close aria-label="Close dialog">×</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  ),
}

export const Open: Story = {
  render: () => (
    <Dialog.Root defaultOpen>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Open dialog</Dialog.Title>
          <Dialog.Description>This story renders the dialog opened by default.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button>Close</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
}
