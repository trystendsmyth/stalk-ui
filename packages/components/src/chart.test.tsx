import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { ChartContainer, ChartLegendContent, ChartTooltipContent } from './chart'

import type { ChartConfig } from './chart'

const config: ChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--colors-accent-solid)' },
  mobile: { label: 'Mobile', color: 'var(--colors-success-solid)' },
}

test('exposes each series color as a CSS variable', () => {
  const { container } = render(
    <ChartContainer config={config}>
      <span>chart</span>
    </ChartContainer>,
  )
  const element = container.querySelector<HTMLDivElement>('[data-chart]')
  expect(element?.style.getPropertyValue('--color-desktop')).toBe('var(--colors-accent-solid)')
  expect(element?.style.getPropertyValue('--color-mobile')).toBe('var(--colors-success-solid)')
})

test('renders tooltip rows using the series labels', () => {
  render(
    <ChartContainer config={config}>
      <ChartTooltipContent active label="January" payload={[{ dataKey: 'desktop', value: 186 }]} />
    </ChartContainer>,
  )
  expect(screen.getByText('January')).toBeInTheDocument()
  expect(screen.getByText('Desktop')).toBeInTheDocument()
  expect(screen.getByText('186')).toBeInTheDocument()
})

test('tooltip content renders nothing when inactive', () => {
  const { container } = render(
    <ChartContainer config={config}>
      <ChartTooltipContent payload={[{ dataKey: 'desktop', value: 1 }]} />
    </ChartContainer>,
  )
  expect(container.querySelector('.stalk-chart__tooltip')).toBeNull()
})

test('renders legend entries using the series labels', () => {
  render(
    <ChartContainer config={config}>
      <ChartLegendContent payload={[{ dataKey: 'desktop' }, { dataKey: 'mobile' }]} />
    </ChartContainer>,
  )
  expect(screen.getByText('Desktop')).toBeInTheDocument()
  expect(screen.getByText('Mobile')).toBeInTheDocument()
})

test('throws when content is used outside a container', () => {
  expect(() => render(<ChartLegendContent payload={[{ dataKey: 'desktop' }]} />)).toThrow(
    /must be used within a <ChartContainer>/,
  )
})

test('renders without axe violations', async () => {
  const { container } = render(
    <ChartContainer config={config}>
      <ChartLegendContent payload={[{ dataKey: 'desktop' }, { dataKey: 'mobile' }]} />
    </ChartContainer>,
  )
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('forwards ref to the container element', () => {
  const ref = createRef<HTMLDivElement>()
  render(
    <ChartContainer ref={ref} config={config}>
      <span>chart</span>
    </ChartContainer>,
  )
  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
