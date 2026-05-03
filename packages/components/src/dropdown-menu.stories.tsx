import { Activity, Copy, ImageIcon, Layers, Scissors, Trash2, Type as TypeIcon } from 'lucide-react'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { HStack, VStack } from 'styled-system/jsx'

import { Button } from './button'
import { DropdownMenu } from './dropdown-menu'

import type { Meta, StoryObj } from '@storybook/react-vite'

const statusBox = css({
  backgroundColor: 'bg.subtle',
  borderRadius: 'sm',
  color: 'fg.muted',
  fontSize: 'sm',
  paddingBlock: '8',
  paddingInline: '12',
})

const useSelection = (initial: string | null = null) => {
  const [value, setValue] = useState<string | null>(initial)
  const select = (next: string) => () => {
    setValue(next)
  }
  return { value, select }
}

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu.Root,
  tags: ['autodocs', 'stable'],
  parameters: {
    controls: { disable: true },
    // Radix DropdownMenu implements the WAI-ARIA modal pattern: when open,
    // sibling content (including the still-focusable Trigger) sits inside an
    // aria-hidden subtree while focus is trapped inside the portal'd Content.
    // axe's aria-hidden-focus rule does not model this pattern and reports a
    // false positive on the open-state stories.
    a11y: {
      config: {
        rules: [{ id: 'aria-hidden-focus', enabled: false }],
      },
    },
  },
} satisfies Meta<typeof DropdownMenu.Root>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const { value, select } = useSelection()
    return (
      <VStack alignItems="flex-start" gap="12">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">Open menu</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onSelect={select('copy')}>Copy</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={select('paste')}>Paste</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={select('cut')}>Cut</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onSelect={select('delete')}>Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <span className={statusBox}>Selected: {value ?? 'None'}</span>
      </VStack>
    )
  },
}

export const WithIcons: Story = {
  render: function Render() {
    const { value, select } = useSelection()
    return (
      <VStack alignItems="flex-start" gap="12">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">Elements</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onSelect={select('activity')}>
              <Activity aria-hidden height={14} width={14} />
              Activity
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={select('group')}>
              <Layers aria-hidden height={14} width={14} />
              Group
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={select('text')}>
              <TypeIcon aria-hidden height={14} width={14} />
              Text
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={select('image')}>
              <ImageIcon aria-hidden height={14} width={14} />
              Image
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <span className={statusBox}>Selected: {value ?? 'None'}</span>
      </VStack>
    )
  },
}

export const WithGroups: Story = {
  render: function Render() {
    const { value, select } = useSelection()
    return (
      <VStack alignItems="flex-start" gap="12">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">Edit</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.Label>Edit</DropdownMenu.Label>
              <DropdownMenu.Item onSelect={select('copy')}>
                <Copy aria-hidden height={14} width={14} />
                Copy
              </DropdownMenu.Item>
              <DropdownMenu.Item onSelect={select('cut')}>
                <Scissors aria-hidden height={14} width={14} />
                Cut
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Label>Actions</DropdownMenu.Label>
              <DropdownMenu.Item onSelect={select('delete')}>
                <Trash2 aria-hidden height={14} width={14} />
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <span className={statusBox}>Selected: {value ?? 'None'}</span>
      </VStack>
    )
  },
}

export const WithShortcuts: Story = {
  render: () => (
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">File</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <Copy aria-hidden height={14} width={14} />
          Copy
          <DropdownMenu.Shortcut>⌘C</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          Paste
          <DropdownMenu.Shortcut>⌘V</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <Trash2 aria-hidden height={14} width={14} />
          Delete
          <DropdownMenu.Shortcut>⌫</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const WithSubmenus: Story = {
  render: function Render() {
    const { value, select } = useSelection()
    return (
      <VStack alignItems="flex-start" gap="12">
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">Elements</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onSelect={select('activity')}>Activity</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={select('group')}>Group</DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>Export as</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item onSelect={select('export-pdf')}>PDF</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={select('export-csv')}>CSV</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={select('export-json')}>JSON</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onSelect={select('text')}>Text</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <span className={statusBox}>Selected: {value ?? 'None'}</span>
      </VStack>
    )
  },
}

export const CheckboxesAndRadios: Story = {
  render: function Render() {
    const [showSidebar, setShowSidebar] = useState(true)
    const [showActivity, setShowActivity] = useState(false)
    const [density, setDensity] = useState('compact')
    return (
      <VStack alignItems="flex-start" gap="12">
        <DropdownMenu.Root defaultOpen>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">View</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label inset>Panels</DropdownMenu.Label>
            <DropdownMenu.CheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
              Show sidebar
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
              Show activity log
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.Separator />
            <DropdownMenu.Label inset>Density</DropdownMenu.Label>
            <DropdownMenu.RadioGroup value={density} onValueChange={setDensity}>
              <DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="comfortable">Comfortable</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="spacious">Spacious</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <span className={statusBox}>
          Sidebar: {String(showSidebar)} · Activity: {String(showActivity)} · Density: {density}
        </span>
      </VStack>
    )
  },
}

export const Inset: Story = {
  render: () => (
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Mixed alignment</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.CheckboxItem checked>Show grid</DropdownMenu.CheckboxItem>
        <DropdownMenu.Item inset>Plain item (inset)</DropdownMenu.Item>
        <DropdownMenu.Item inset>Another inset item</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const Disabled: Story = {
  render: () => (
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Enabled item</DropdownMenu.Item>
        <DropdownMenu.Item disabled>Disabled item</DropdownMenu.Item>
        <DropdownMenu.Item>Another enabled item</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    const close = () => {
      setOpen(false)
    }
    const toggle = () => {
      setOpen((value) => !value)
    }
    return (
      <HStack alignItems="center" gap="12">
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">{open ? 'Close' : 'Open'} menu</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onSelect={close}>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={close}>Item 2</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={close}>Item 3</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Button variant="ghost" onClick={toggle}>
          Toggle from outside
        </Button>
      </HStack>
    )
  },
}

export const SidePositions: Story = {
  render: () => (
    <HStack gap="12">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <DropdownMenu.Root key={side}>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">{side}</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side={side}>
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ))}
    </HStack>
  ),
}

export const Submenu: Story = {
  render: () => (
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Share</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Copy link</DropdownMenu.Item>
        <DropdownMenu.Sub open>
          <DropdownMenu.SubTrigger>Send to</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Email</DropdownMenu.Item>
            <DropdownMenu.Item>Slack</DropdownMenu.Item>
            <DropdownMenu.Sub open>
              <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>SMS</DropdownMenu.Item>
                <DropdownMenu.Item>QR code</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Manage access</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const Open: Story = {
  render: () => (
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Open menu</DropdownMenu.Label>
        <DropdownMenu.Item>First action</DropdownMenu.Item>
        <DropdownMenu.Item>Second action</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

export const Complex: Story = {
  render: () => (
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Project actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.CheckboxItem checked>Show sidebar</DropdownMenu.CheckboxItem>
        <DropdownMenu.RadioGroup value="compact">
          <DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="comfortable">Comfortable</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Export</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>PDF</DropdownMenu.Item>
            <DropdownMenu.Item>CSV</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}
