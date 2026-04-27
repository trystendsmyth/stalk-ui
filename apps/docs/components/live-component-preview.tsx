'use client'

import { Badge } from '@stalk-ui/components/badge'
import { Button } from '@stalk-ui/components/button'
import { Checkbox } from '@stalk-ui/components/checkbox'
import { Dialog } from '@stalk-ui/components/dialog'
import { DropdownMenu } from '@stalk-ui/components/dropdown-menu'
import { Input } from '@stalk-ui/components/input'
import { Label } from '@stalk-ui/components/label'
import { Popover } from '@stalk-ui/components/popover'
import { Radio } from '@stalk-ui/components/radio'
import { Select } from '@stalk-ui/components/select'
import { Switch } from '@stalk-ui/components/switch'
import { Textarea } from '@stalk-ui/components/textarea'
import { Tooltip } from '@stalk-ui/components/tooltip'

import { ComponentPreview } from './component-preview'

import type { ReactNode } from 'react'

interface LiveComponentPreviewProps {
  code: string
  example?: number
  slug: string
}

const previewBySlug: Record<string, ReactNode[]> = {
  badge: [<Badge key="badge">Published</Badge>],
  button: [
    <Button key="button" variant="outline">
      Save
    </Button>,
    <Button key="button-outline" variant="outline">
      Cancel
    </Button>,
    <Button key="button-loading" loading>
      Saving
    </Button>,
  ],
  checkbox: [
    <Checkbox key="checkbox" label="Accept terms" />,
    <Checkbox
      key="checkbox-description"
      description="Receive product release notes."
      id="release-notes-preview"
      label="Release notes"
    />,
    <Checkbox key="checkbox-invalid" invalid label="Required checkbox" />,
  ],
  dialog: [
    <Dialog.Root key="dialog">
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
    </Dialog.Root>,
  ],
  'dropdown-menu': [
    <DropdownMenu.Root key="dropdown-menu">
      <DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Project</DropdownMenu.Label>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          Rename
          <DropdownMenu.Shortcut>R</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>,
  ],
  input: [<Input key="input" aria-label="Email" placeholder="hello@stalk-ui.com" />],
  label: [
    <Label key="label" htmlFor="email-preview">
      Email
    </Label>,
  ],
  popover: [
    <Popover.Root key="popover">
      <Popover.Trigger>Open popover</Popover.Trigger>
      <Popover.Content>Interactive content</Popover.Content>
    </Popover.Root>,
  ],
  radio: [<Radio key="radio" label="Basic" name="plan-preview" value="basic" />],
  select: [
    <Select key="select" aria-label="Status">
      <option>Draft</option>
      <option>Published</option>
    </Select>,
  ],
  switch: [<Switch key="switch" label="Email notifications" />],
  textarea: [<Textarea key="textarea" aria-label="Message" placeholder="Write a message..." />],
  tooltip: [
    <Tooltip.Provider key="tooltip">
      <Tooltip.Root>
        <Tooltip.Trigger>Help</Tooltip.Trigger>
        <Tooltip.Content>Helpful context</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>,
  ],
}

export const LiveComponentPreview = ({ code, example = 0, slug }: LiveComponentPreviewProps) => {
  const previews = previewBySlug[slug]
  const preview = previews?.[example] ?? previews?.[0]

  if (preview === undefined) {
    return null
  }

  return <ComponentPreview code={code}>{preview}</ComponentPreview>
}
