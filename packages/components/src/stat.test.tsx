import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Stat } from './stat'

test('renders label, value, unit, and delta without axe violations', async () => {
  const { container } = render(
    <Stat.Root>
      <Stat.Label>Production today</Stat.Label>
      <Stat.Value>
        412 <Stat.Unit>kWh</Stat.Unit>
      </Stat.Value>
      <Stat.Delta direction="up">+8.2%</Stat.Delta>
    </Stat.Root>,
  )

  expect(screen.getByText('Production today')).toBeInTheDocument()
  expect(screen.getByText('kWh')).toBeInTheDocument()
  expect(screen.getByText('+8.2%')).toBeInTheDocument()
  expect((await axe(container)).violations).toHaveLength(0)
})

test('tones the delta by direction', () => {
  render(
    <Stat.Root>
      <Stat.Value>3</Stat.Value>
      <Stat.Delta direction="down">-2.4%</Stat.Delta>
      <Stat.Delta direction="flat">0%</Stat.Delta>
    </Stat.Root>,
  )

  expect(screen.getByText('-2.4%').className).toContain('color-palette_danger')
  expect(screen.getByText('0%').className).toContain('color-palette_neutral')
})
