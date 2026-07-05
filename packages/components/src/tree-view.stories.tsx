import { fn } from 'storybook/test'

import { TreeView } from './tree-view'

import type { Meta, StoryObj } from '@storybook/react-vite'

const devices = [
  {
    id: 'site-a',
    label: 'North field',
    children: [
      { id: 'meter-1', label: 'Meter 1' },
      {
        id: 'bank-1',
        label: 'Inverter bank 1',
        children: [
          { id: 'inv-1', label: 'Inverter 1' },
          { id: 'inv-2', label: 'Inverter 2' },
        ],
      },
    ],
  },
  {
    id: 'site-b',
    label: 'South field',
    children: [{ id: 'inv-9', label: 'Inverter 9' }],
  },
  { id: 'site-c', label: 'Storage yard', disabled: true },
]

const meta = {
  title: 'Components/Data Display/Tree View',
  component: TreeView,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Devices',
    defaultExpanded: ['site-a'],
    nodes: devices,
    onSelect: fn(),
  },
  argTypes: {
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    defaultExpanded: { table: { disable: true } },
    defaultSelected: { table: { disable: true } },
    expanded: { table: { disable: true } },
    nodes: { table: { disable: true } },
    onExpandedChange: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    selected: { table: { disable: true } },
  },
} satisfies Meta<typeof TreeView>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSelection: Story = {
  args: { defaultExpanded: ['site-a', 'bank-1'], defaultSelected: 'inv-2' },
  parameters: { controls: { disable: true } },
}
