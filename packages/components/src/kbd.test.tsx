import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Kbd } from './kbd'

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(<Kbd size={size}>Esc</Kbd>)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByText('Esc').tagName).toBe('KBD')
})

test('forwards refs and attributes', () => {
  const ref = createRef<HTMLElement>()

  render(
    <Kbd ref={ref} data-testid="kbd">
      K
    </Kbd>,
  )

  expect(screen.getByTestId('kbd')).toBe(ref.current)
})
