import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Blockquote } from './blockquote'

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(<Blockquote size={size}>A quotation.</Blockquote>)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByText('A quotation.').tagName).toBe('BLOCKQUOTE')
})

test('applies a tone palette when set', () => {
  render(<Blockquote tone="info">Info quote</Blockquote>)

  expect(screen.getByText('Info quote')).toBeInTheDocument()
})

test('forwards refs and attributes', () => {
  const ref = createRef<HTMLQuoteElement>()

  render(
    <Blockquote ref={ref} data-testid="blockquote">
      Quote
    </Blockquote>,
  )

  expect(screen.getByTestId('blockquote')).toBe(ref.current)
})
