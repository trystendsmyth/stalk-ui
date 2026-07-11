import { dataList as dataListRecipe } from 'styled-system/recipes'

import { Badge } from './badge'
import { Code } from './code'
import { DataList } from './data-list'
import { Link } from './link'

import type { Meta, StoryObj } from '@storybook/react-vite'

const { orientation: ORIENTATIONS, size: SIZES } = dataListRecipe.variantMap

const meta = {
  title: 'Components/Tables & Lists/Data List',
  component: DataList.Root,
  tags: ['autodocs', 'stable'],
  args: {
    orientation: 'horizontal',
    size: 'md',
  },
  argTypes: {
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    orientation: {
      control: 'inline-radio',
      options: ORIENTATIONS,
    },
    size: {
      control: 'inline-radio',
      options: SIZES,
    },
  },
} satisfies Meta<typeof DataList.Root>

export default meta

type Story = StoryObj<typeof meta>

const renderRecord: Story['render'] = (args) => (
  <DataList.Root {...args} style={{ maxWidth: '28rem' }}>
    <DataList.Item>
      <DataList.Label>Status</DataList.Label>
      <DataList.Value>
        <Badge tone="success" variant="subtle">
          Authorized
        </Badge>
      </DataList.Value>
    </DataList.Item>
    <DataList.Item>
      <DataList.Label>ID</DataList.Label>
      <DataList.Value>
        <Code>u_2J89JSA4GJ</Code>
      </DataList.Value>
    </DataList.Item>
    <DataList.Item>
      <DataList.Label>Name</DataList.Label>
      <DataList.Value>Ada Lovelace</DataList.Value>
    </DataList.Item>
    <DataList.Item>
      <DataList.Label>Email</DataList.Label>
      <DataList.Value>
        <Link href="mailto:ada@example.com">ada@example.com</Link>
      </DataList.Value>
    </DataList.Item>
    <DataList.Item>
      <DataList.Label>Company</DataList.Label>
      <DataList.Value>
        <Link href="https://example.com">Analytical Engines</Link>
      </DataList.Value>
    </DataList.Item>
  </DataList.Root>
)

export const Default: Story = {
  render: renderRecord,
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: renderRecord,
}

export const LabelTones: Story = {
  render: (args) => (
    <DataList.Root {...args} orientation="vertical" style={{ maxWidth: '20rem' }}>
      <DataList.Item>
        <DataList.Label tone="accent">Accent</DataList.Label>
        <DataList.Value>Primary brand palette</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label tone="success">Success</DataList.Label>
        <DataList.Value>Operation completed</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label tone="warning">Warning</DataList.Label>
        <DataList.Value>Needs attention</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label tone="danger">Danger</DataList.Label>
        <DataList.Value>Action required</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  ),
}
