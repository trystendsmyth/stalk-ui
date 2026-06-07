import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Code } from './code'

const variants = ['soft', 'outline', 'ghost'] as const

test.each(variants)('renders %s variant without axe violations', async (variant) => {
  const { container } = render(<Code variant={variant}>pnpm build</Code>)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByText('pnpm build').tagName).toBe('CODE')
})

test('forwards refs and attributes', () => {
  const ref = createRef<HTMLElement>()

  render(
    <Code ref={ref} data-testid="code">
      x
    </Code>,
  )

  expect(screen.getByTestId('code')).toBe(ref.current)
})
