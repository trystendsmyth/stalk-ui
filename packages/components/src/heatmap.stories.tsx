import { HeatMap } from './heatmap'

import type { Meta, StoryObj } from '@storybook/react-vite'

const inverters = ['Inverter 1', 'Inverter 2', 'Inverter 3', 'Inverter 4']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

// Deterministic sample data so visual snapshots stay stable.
const performance: Record<string, Record<string, number | null>> = {
  'Inverter 1': { Mon: 98, Tue: 96, Wed: 99, Thu: 94, Fri: 97 },
  'Inverter 2': { Mon: 82, Tue: 88, Wed: 79, Thu: 91, Fri: 85 },
  'Inverter 3': { Mon: 64, Tue: 58, Wed: null, Thu: 71, Fri: 69 },
  'Inverter 4': { Mon: 45, Tue: 52, Wed: 48, Thu: 40, Fri: 55 },
}

// Signed deviation from target, for the diverging scale.
const deviation: Record<string, Record<string, number | null>> = {
  'Inverter 1': { Mon: 4, Tue: 1, Wed: 6, Thu: -2, Fri: 3 },
  'Inverter 2': { Mon: -3, Tue: 2, Wed: -7, Thu: 5, Fri: 0 },
  'Inverter 3': { Mon: -9, Tue: -12, Wed: null, Thu: -4, Fri: -6 },
  'Inverter 4': { Mon: -15, Tue: -10, Wed: -13, Thu: -18, Fri: -8 },
}

const meta = {
  title: 'Components/Data Display/HeatMap',
  component: HeatMap,
  tags: ['autodocs', 'stable'],
  argTypes: {
    cell: { table: { disable: true } },
    rows: { table: { disable: true } },
    columns: { table: { disable: true } },
  },
} satisfies Meta<typeof HeatMap>

export default meta

type Story = StoryObj<typeof meta>

export const Sequential: Story = {
  args: {
    rows: inverters,
    columns: days,
    cell: (row, column) => performance[row]?.[column] ?? null,
    'aria-label': 'Weekly inverter performance index',
    caption: 'Performance index (%) by inverter and weekday.',
    formatValue: (value) => `${String(value)}%`,
    legend: true,
  },
}

export const Diverging: Story = {
  args: {
    rows: inverters,
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
