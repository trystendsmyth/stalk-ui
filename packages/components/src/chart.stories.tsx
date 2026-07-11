import { Box } from 'styled-system/jsx'

import { ChartContainer, ChartLegendContent, ChartTooltipContent } from './chart'

import type { ChartConfig } from './chart'
import type { Meta, StoryObj } from '@storybook/react-vite'

const config: ChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--colors-accent-solid)' },
  mobile: { label: 'Mobile', color: 'var(--colors-success-solid)' },
}

const meta = {
  title: 'Components/Data Visualization/Chart',
  component: ChartContainer,
  tags: ['autodocs', 'stable'],
  // `config` is a complex object and the chart is composed via children — hide controls.
  parameters: { controls: { disable: true } },
  args: { config },
} satisfies Meta<typeof ChartContainer>

export default meta

type Story = StoryObj<typeof meta>

// Option B: recharts is consumer-provided. These stories demonstrate the theming
// contract (container variables + tooltip/legend content) with static payloads,
// so no charting dependency is bundled.
export const ThemingContract: Story = {
  render: () => (
    <Box w="360px">
      <ChartContainer config={config} style={{ aspectRatio: 'auto' }}>
        <Box display="grid" gap="16" w="full">
          <ChartTooltipContent
            active
            label="January"
            payload={[
              { dataKey: 'desktop', value: 186 },
              { dataKey: 'mobile', value: 80 },
            ]}
          />
          <ChartLegendContent payload={[{ dataKey: 'desktop' }, { dataKey: 'mobile' }]} />
        </Box>
      </ChartContainer>
    </Box>
  ),
}
