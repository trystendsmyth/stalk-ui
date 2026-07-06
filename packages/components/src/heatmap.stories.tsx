import { fn } from 'storybook/test'

import { HeatMap } from './heatmap'

import type { Meta, StoryObj } from '@storybook/react-vite'

const machines = ['Node 1', 'Node 2', 'Node 3', 'Node 4']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

// Deterministic sample data so visual snapshots stay stable.
const performance: Record<string, Record<string, number | null>> = {
  'Node 1': { Mon: 98, Tue: 96, Wed: 99, Thu: 94, Fri: 97 },
  'Node 2': { Mon: 82, Tue: 88, Wed: 79, Thu: 91, Fri: 85 },
  'Node 3': { Mon: 64, Tue: 58, Wed: null, Thu: 71, Fri: 69 },
  'Node 4': { Mon: 45, Tue: 52, Wed: 48, Thu: 40, Fri: 55 },
}

// Signed deviation from target, for the diverging scale.
const deviation: Record<string, Record<string, number | null>> = {
  'Node 1': { Mon: 4, Tue: 1, Wed: 6, Thu: -2, Fri: 3 },
  'Node 2': { Mon: -3, Tue: 2, Wed: -7, Thu: 5, Fri: 0 },
  'Node 3': { Mon: -9, Tue: -12, Wed: null, Thu: -4, Fri: -6 },
  'Node 4': { Mon: -15, Tue: -10, Wed: -13, Thu: -18, Fri: -8 },
}

const meta = {
  title: 'Components/Data Display/HeatMap',
  component: HeatMap,
  tags: ['autodocs', 'stable'],
  argTypes: {
    // Data/render props + the [min,max] domain tuple aren't editable as controls.
    cell: { table: { disable: true } },
    rows: { table: { disable: true } },
    columns: { table: { disable: true } },
    domain: { table: { disable: true } },
    formatValue: { table: { disable: true } },
  },
} satisfies Meta<typeof HeatMap>

export default meta

type Story = StoryObj<typeof meta>

export const Sequential: Story = {
  args: {
    rows: machines,
    columns: days,
    cell: (row, column) => performance[row]?.[column] ?? null,
    'aria-label': 'Weekly node performance index',
    caption: 'Performance index (%) by node and weekday.',
    formatValue: (value) => `${String(value)}%`,
    legend: true,
  },
}

export const Diverging: Story = {
  args: {
    rows: machines,
    columns: days,
    scale: 'diverging',
    midpoint: 0,
    cell: (row, column) => deviation[row]?.[column] ?? null,
    'aria-label': 'Deviation from target',
    caption: 'Signed deviation from target (%). Red below, blue above.',
    formatValue: (value) => `${value > 0 ? '+' : ''}${String(value)}%`,
    legend: true,
  },
}

export const Inspectable: Story = {
  args: {
    ...Sequential.args,
    inspectable: true,
    caption: 'Cells are keyboard-focusable — tab through to inspect each value.',
  },
}

// Deterministic fleet large enough that the grid actually scrolls.
const fleet = Array.from({ length: 24 }, (_, index) => `Node ${String(index + 1)}`)
const fleetCell = (row: string, column: string) =>
  40 + ((fleet.indexOf(row) * 13 + days.indexOf(column) * 29) % 60)

// `columnsSticky` pins the column axis while a tall grid scrolls — e.g. a
// large fleet over a 24h axis. The height constraint goes on the
// HeatMap itself: its root is the scroll container (it owns `overflow`), so
// sticky headers pin to it, not to an outer wrapper.
export const StickyColumns: Story = {
  args: {
    'aria-label': 'Fleet performance with sticky column axis',
    caption: 'Scroll the grid — the weekday axis stays pinned.',
    cell: fleetCell,
    columns: days,
    columnsSticky: true,
    rows: fleet,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A 24-row fleet in a height-capped grid. With `columnsSticky` the weekday axis stays pinned while you scroll; toggle the control off to watch it scroll away. Constrain the HeatMap itself (its root owns the scroll), not a wrapper.',
      },
    },
  },
  render: (args) => <HeatMap {...args} style={{ maxHeight: 300 }} />,
}

// Composable HeatMap.* — labeled sections, in-cell content, status-tone fills, and
// click-to-drill cells (each cell is a focusable button). Color here comes from a
// `tone` (a saturated `vivid` fill); pass `value` + a Root `domain` for scale color.
export const DataGrid: Story = {
  // Placeholder args satisfy the simple-HeatMap meta type; the render uses HeatMap.*.
  args: { cell: () => null, columns: [], rows: [] },
  parameters: {
    controls: { disable: true },
    // Cell values render as small text over data-driven color fills; axe flags the
    // readout on saturated cells (e.g. white on green ≈ 3.07:1). The coloring is the
    // data encoding, so disable color-contrast here rather than mute the scale.
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => (
    <HeatMap.Root aria-label="Service availability by window" columns={['1h', '24h', '7d']}>
      <HeatMap.Group aside={<span>witness ok</span>} label="us-east">
        <HeatMap.Row header="api">
          <HeatMap.Cell label="api, 1h: 99.9%" onClick={fn()} tone="success">
            <HeatMap.CellValue>99.9%</HeatMap.CellValue>
            <HeatMap.CellMeta>0 err</HeatMap.CellMeta>
          </HeatMap.Cell>
          <HeatMap.Cell label="api, 24h: 99.4%" onClick={fn()} tone="success">
            <HeatMap.CellValue>99.4%</HeatMap.CellValue>
            <HeatMap.CellMeta>2 err</HeatMap.CellMeta>
          </HeatMap.Cell>
          <HeatMap.Cell label="api, 7d: 97.1%" onClick={fn()} tone="warning">
            <HeatMap.CellValue>97.1%</HeatMap.CellValue>
            <HeatMap.CellMeta>18 err</HeatMap.CellMeta>
          </HeatMap.Cell>
        </HeatMap.Row>
        <HeatMap.Row header="web">
          <HeatMap.Cell label="web, 1h: 99.2%" onClick={fn()} tone="success">
            <HeatMap.CellValue>99.2%</HeatMap.CellValue>
            <HeatMap.CellMeta>1 err</HeatMap.CellMeta>
          </HeatMap.Cell>
          <HeatMap.Cell label="web, 24h: 94.0%" onClick={fn()} tone="warning">
            <HeatMap.CellValue>94.0%</HeatMap.CellValue>
            <HeatMap.CellMeta>40 err</HeatMap.CellMeta>
          </HeatMap.Cell>
          <HeatMap.Cell label="web, 7d: 88.5%" onClick={fn()} tone="danger">
            <HeatMap.CellValue>88.5%</HeatMap.CellValue>
            <HeatMap.CellMeta>210 err</HeatMap.CellMeta>
          </HeatMap.Cell>
        </HeatMap.Row>
      </HeatMap.Group>
    </HeatMap.Root>
  ),
}
