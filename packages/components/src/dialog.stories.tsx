import { Button } from './button'
import { Dialog } from './dialog'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
} satisfies Meta<typeof Dialog.Root>

export default meta

type Story = StoryObj<typeof meta>

const DialogExample = () => (
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
      <div style={{ display: 'grid', gap: 8 }}>
        <label htmlFor="dialog-email">Email</label>
        <input id="dialog-email" placeholder="teammate@stalk-ui.com" />
      </div>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="outline">Cancel</Button>
        </Dialog.Close>
        <Button>Send invite</Button>
      </Dialog.Footer>
      <Dialog.Close aria-label="Close dialog">×</Dialog.Close>
    </Dialog.Content>
  </Dialog.Root>
)

export const Default: Story = {
  render: () => <DialogExample />,
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

export const RainbowTheme: Story = {
  render: () => (
    <div data-panda-theme="rainbow">
      <DialogExample />
    </div>
  ),
}

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>افتح الحوار</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>دعوة متعاونين</Dialog.Title>
            <Dialog.Description>شارك هذا المشروع مع الفريق.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button>إغلاق</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div data-color-mode="dark" style={{ background: '#111', padding: 24 }}>
      <DialogExample />
    </div>
  ),
}
