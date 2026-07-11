import { css } from 'styled-system/css'

import { VirtualList } from './virtual-list'

import type { Meta, StoryObj } from '@storybook/react-vite'

interface Row {
  id: number
  label: string
}

const makeRows = (count: number): Row[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    label: `Item ${String(index + 1)}`,
  }))

const frame = css({
  h: '400px',
  w: '360px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'border.default',
  rounded: 'md',
})

const rowClass = css({
  alignItems: 'center',
  borderBlockEndWidth: '1px',
  borderBlockEndStyle: 'solid',
  borderColor: 'border.muted',
  display: 'flex',
  h: '48px',
  px: '16',
})

const meta = {
  title: 'Components/Tables & Lists/VirtualList',
  component: VirtualList<Row>,
  tags: ['autodocs', 'stable'],
  argTypes: {
    overscan: { control: 'number' },
    // Data + render/config functions aren't editable as controls.
    items: { table: { disable: true } },
    estimateSize: { table: { disable: true } },
    getItemKey: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof VirtualList<Row>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: makeRows(10_000),
    estimateSize: () => 48,
    getItemKey: (row) => row.id,
    className: frame,
    children: (row, virtualItem) => (
      <VirtualList.Item key={row.id} virtualItem={virtualItem}>
        <div className={rowClass}>{row.label}</div>
      </VirtualList.Item>
    ),
  },
}

// Variable-height rows: `estimateSize` seeds layout, then each item self-measures.
export const DynamicHeights: Story = {
  args: {
    items: makeRows(5_000),
    estimateSize: () => 64,
    getItemKey: (row) => row.id,
    className: frame,
    children: (row, virtualItem) => {
      const lines = (row.id % 4) + 1
      return (
        <VirtualList.Item key={row.id} virtualItem={virtualItem}>
          <div
            className={css({
              borderBlockEndWidth: '1px',
              borderColor: 'border.muted',
              p: '16',
            })}
          >
            <strong>{row.label}</strong>
            {Array.from({ length: lines }, (_, line) => (
              <p key={line} className={css({ color: 'fg.muted', textStyle: 'bodySm' })}>
                Detail line {String(line + 1)}
              </p>
            ))}
          </div>
        </VirtualList.Item>
      )
    },
  },
}
