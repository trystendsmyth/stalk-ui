import { X } from 'lucide-react'
import { fn } from 'storybook/test'
import { css } from 'styled-system/css'
import { VStack } from 'styled-system/jsx'

import { Button } from './button'
import { Dialog } from './dialog'
import { Input } from './input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Overlay/Dialog',
  component: Dialog.Root,
  tags: ['autodocs', 'stable'],
  args: {
    defaultOpen: false,
    modal: true,
    onOpenChange: fn(),
  },
  argTypes: {
    children: { table: { disable: true } },
    defaultOpen: { control: 'boolean' },
    modal: { control: 'boolean' },
    onOpenChange: { table: { disable: true } },
    open: { table: { disable: true } },
  },
} satisfies Meta<typeof Dialog.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Dialog.Root {...args}>
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
        <Dialog.Body>
          <VStack alignItems="stretch" gap="8">
            <label htmlFor="dialog-email">Email</label>
            <Input id="dialog-email" placeholder="teammate@stalk-ui.com" type="email" />
          </VStack>
        </Dialog.Body>
        <Dialog.Footer>
          <Button>Send invite</Button>
        </Dialog.Footer>
        <Dialog.Close aria-label="Close dialog">
          <X aria-hidden size={16} />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  ),
}

export const Open: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Dialog.Root {...args}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Open dialog</Dialog.Title>
          <Dialog.Description>This story renders the dialog opened by default.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Close asChild>
          <Button
            className={css({
              pos: 'absolute',
              insetBlockStart: '12',
              insetInlineEnd: '12',
            })}
            size="sm"
            variant="outline"
          >
            Cancel
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  ),
}

export const ScrollInside: Story = {
  render: (args) => (
    <Dialog.Root {...args}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Release notes</Button>
      </Dialog.Trigger>
      <Dialog.Content className={css({ maxH: '20rem' })} scrollBehavior="inside">
        <Dialog.Header>
          <Dialog.Title>Release notes</Dialog.Title>
          <Dialog.Description>
            With `scrollBehavior` set to `inside`, the header and footer stay pinned while
            Dialog.Body owns the scroll.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i}>
              Entry {i + 1}: fixed the thing, improved the other thing, and documented the third
              thing so the changelog has enough height to demonstrate an inner scroll region.
            </p>
          ))}
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button size="sm" variant="outline">
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
        <Dialog.Close aria-label="Close dialog">
          <X aria-hidden size={16} />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  ),
}

export const Draggable: Story = {
  args: { modal: false },
  render: (args) => (
    <Dialog.Root {...args}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open inspector</Button>
      </Dialog.Trigger>
      <Dialog.Content draggable layout="banded" overlay={false}>
        <Dialog.Header>
          <Dialog.Title>Inspector</Dialog.Title>

          <Dialog.Description className={css({ me: 'auto' })}>
            Drag the header to move this panel
          </Dialog.Description>
          <Dialog.HeaderActions>
            <Dialog.Close aria-label="Close dialog">
              <X aria-hidden size={16} />
            </Dialog.Close>
          </Dialog.HeaderActions>
        </Dialog.Header>
        <Dialog.Body>Floating, non-modal, draggable.</Dialog.Body>
        <Dialog.Footer>
          <Button fullWidth>Action One</Button>
          <Button fullWidth>Action Two</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
}

export const NonModal: Story = {
  args: { modal: false },
  render: (args) => (
    <Dialog.Root {...args}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open panel</Button>
      </Dialog.Trigger>
      <Dialog.Content overlay={false}>
        <Dialog.Header>
          <Dialog.Title>Non-modal panel</Dialog.Title>
          <Dialog.Description>
            With `modal={false}` and `overlay={false}` the page behind stays interactive — for live,
            click-through side panels.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button size="sm" variant="outline">
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
}
