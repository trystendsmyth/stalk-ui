import { useState } from 'react'
import { fn } from 'storybook/test'
import { HStack } from 'styled-system/jsx'

import { Button } from './button'
import { Checkbox } from './checkbox'
import { Tree } from './tree'

import type { TreeNode, TreeProps } from './tree'
import type { Meta, StoryObj } from '@storybook/react-vite'

const files = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'index-ts', label: 'index.ts' },
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'button-tsx', label: 'Button.tsx' },
          { id: 'card-tsx', label: 'Card.tsx' },
        ],
      },
    ],
  },
  {
    id: 'public',
    label: 'public',
    children: [{ id: 'favicon-svg', label: 'favicon.svg' }],
  },
  { id: 'legacy', label: 'legacy', disabled: true },
]

const meta = {
  title: 'Components/Data Display/Tree',
  component: Tree,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Files',
    defaultExpanded: ['src'],
    fullWidth: false,
    guides: false,
    nodes: files,
    onSelectedChange: fn(),
    radius: 'sm',
    selectionMode: 'single',
    size: 'md',
    typeahead: true,
    variant: 'ghost',
  },
  argTypes: {
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    defaultExpanded: { table: { disable: true } },
    defaultSelected: { table: { disable: true } },
    expanded: { table: { disable: true } },
    fullWidth: { control: 'boolean' },
    nodes: { table: { disable: true } },
    onExpandedChange: { table: { disable: true } },
    onSelectedChange: { table: { disable: true } },
    radius: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'full'] },
    selected: { table: { disable: true } },
    selectionMode: { control: 'inline-radio', options: ['single', 'multiple'] },
    size: { control: 'inline-radio', options: ['micro', 'sm', 'md', 'lg'] },
    typeahead: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['ghost', 'solid', 'outline'] },
  },
} satisfies Meta<typeof Tree>

export default meta

type Story = StoryObj<typeof meta>

// Typeahead comes free: focus the tree and type "p" to jump to public.
export const Default: Story = {}

export const WithSelection: Story = {
  args: { defaultExpanded: ['src', 'components'], defaultSelected: ['card-tsx'], guides: true },
  parameters: {
    docs: {
      description: {
        story: '`guides` draws indentation rules; `defaultSelected` premarks a row.',
      },
    },
  },
}

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Selection treatments side by side: `ghost` tints the row, `solid` fills it, `outline` draws an inset ring. Combine with `size` (micro–lg) and `radius` (none–full) via the controls on Default.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(3, 14rem)' }}>
      {(['ghost', 'solid', 'outline'] as const).map((variant) => (
        <figure key={variant} style={{ margin: 0 }}>
          <figcaption style={{ marginBlockEnd: '0.5rem' }}>
            <code>{variant}</code>
          </figcaption>
          <Tree
            {...args}
            aria-label={`Files (${variant})`}
            defaultExpanded={['src', 'components']}
            defaultSelected={['card-tsx']}
            guides
            variant={variant}
          />
        </figure>
      ))}
    </div>
  ),
}

export const FullWidth: Story = {
  args: {
    defaultExpanded: ['src', 'components'],
    defaultSelected: ['card-tsx'],
    fullWidth: true,
    guides: false,
    variant: 'solid',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`fullWidth` keeps every row the same width with aligned edges regardless of depth — the indent moves inside the row. Best with `solid` or `outline`, where the row box is visible.',
      },
    },
  },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <Tree {...args} />
    </div>
  ),
}

const descendantIds = (node: TreeNode): string[] => [
  node.id,
  ...(node.children?.flatMap(descendantIds) ?? []),
]

const leafIds = (node: TreeNode): string[] =>
  node.children === undefined ? [node.id] : node.children.flatMap(leafIds)

const findEntry = (level: readonly TreeNode[], id: string): TreeNode | undefined => {
  for (const node of level) {
    if (node.id === id) {
      return node
    }
    const found = node.children === undefined ? undefined : findEntry(node.children, id)
    if (found !== undefined) {
      return found
    }
  }
  return undefined
}

const CheckboxTreeDemo = (args: TreeProps) => {
  const [selected, setSelected] = useState<readonly string[]>(['button-tsx'])
  const selectedSet = new Set(selected)

  // A branch toggle cascades to its descendants; the branch checkbox derives
  // its state (checked / indeterminate) from its leaves.
  const handleChange = (next: string[]) => {
    const nextSet = new Set(next)
    const union = new Set([...next, ...selected])
    const toggled = [...union].filter((id) => selectedSet.has(id) !== nextSet.has(id))
    const branch = toggled.length === 1 ? findEntry(files, toggled[0] ?? '') : undefined
    if (branch?.children !== undefined) {
      for (const id of descendantIds(branch)) {
        if (nextSet.has(branch.id)) {
          nextSet.add(id)
        } else {
          nextSet.delete(id)
        }
      }
    }
    setSelected([...nextSet])
  }

  const decorate = (node: TreeNode): TreeNode => {
    const leaves = leafIds(node)
    const checked =
      node.children === undefined
        ? selectedSet.has(node.id)
        : leaves.every((id) => selectedSet.has(id)) ||
          (leaves.some((id) => selectedSet.has(id)) && 'indeterminate')
    return {
      ...node,
      // Presentation-only checkbox: the row handles interaction, so only the
      // control is hidden from AT — the text stays visible so the treeitem
      // keeps its accessible name.
      label: (
        <span
          style={{ alignItems: 'center', display: 'inline-flex', gap: 8, pointerEvents: 'none' }}
        >
          <span aria-hidden style={{ display: 'inline-flex' }}>
            <Checkbox checked={checked} size="sm" tabIndex={-1} />
          </span>
          {node.label}
        </span>
      ),
      ...(typeof node.label === 'string' ? { textValue: node.label } : {}),
      ...(node.children === undefined ? {} : { children: node.children.map(decorate) }),
    }
  }

  return (
    <Tree
      {...args}
      nodes={files.map(decorate)}
      selected={selected}
      selectionMode="multiple"
      onSelectedChange={handleChange}
    />
  )
}

export const CheckboxTree: Story = {
  args: { defaultExpanded: ['src', 'components'] },
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox tree composed from the multiple-selection API: clicking toggles a row, toggling a branch cascades to its descendants, and branch checkboxes derive a tri-state from their leaves. The checkboxes are presentation-only — the row remains the interactive surface.',
      },
    },
  },
  render: (args) => <CheckboxTreeDemo {...args} />,
}

export const MultipleSelection: Story = {
  args: {
    defaultExpanded: ['src', 'components'],
    defaultSelected: ['button-tsx', 'card-tsx'],
    selectionMode: 'multiple',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ctrl/Cmd-click or Enter toggles rows, Shift+Arrow extends the selection, and Ctrl+A selects every visible row.',
      },
    },
  },
}

export const ControlledExpansion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`expanded` + `onExpandedChange` make expansion fully controlled — expand/collapse-all is a one-liner. `*` on a focused row expands its sibling branches.',
      },
    },
  },
  render: (args) => {
    const [expanded, setExpanded] = useState<readonly string[]>(['src'])
    return (
      <div>
        <HStack gap="8" mb="12">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setExpanded(['src', 'components', 'public'])
            }}
          >
            Expand all
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setExpanded([])
            }}
          >
            Collapse all
          </Button>
        </HStack>
        <Tree {...args} expanded={expanded} onExpandedChange={setExpanded} />
      </div>
    )
  },
}
