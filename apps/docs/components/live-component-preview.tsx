'use client'

import { Dialog } from '@stalk-ui/components/dialog'

import { ComponentPreview } from './component-preview'

const dialogExample = `<Dialog.Root>
  <Dialog.Trigger>Open dialog</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Confirm changes</Dialog.Title>
      <Dialog.Description>
        This dialog is rendered by the docs app through real PandaCSS codegen.
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`

interface LiveComponentPreviewProps {
  slug: string
}

export const LiveComponentPreview = ({ slug }: LiveComponentPreviewProps) => {
  if (slug !== 'dialog') {
    return null
  }

  return (
    <ComponentPreview code={dialogExample}>
      <Dialog.Root>
        <Dialog.Trigger>Open dialog</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Confirm changes</Dialog.Title>
            <Dialog.Description>
              This dialog is rendered by the docs app through real PandaCSS codegen.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </ComponentPreview>
  )
}
