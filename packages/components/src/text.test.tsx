import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Em, Quote, Strong, Text } from './text'

test('renders without axe violations', async () => {
  const { container } = render(
    <Text>
      Press <Text.Strong>Save</Text.Strong> to keep <Text.Em>your</Text.Em> changes.
    </Text>,
  )
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByText(/Press/)).toBeInTheDocument()
})

test('renders a paragraph by default and swaps element via `as`', () => {
  render(
    <>
      <Text>paragraph</Text>
      <Text as="span">inline</Text>
      <Text as="label">labelled</Text>
    </>,
  )

  expect(screen.getByText('paragraph').tagName).toBe('P')
  expect(screen.getByText('inline').tagName).toBe('SPAN')
  expect(screen.getByText('labelled').tagName).toBe('LABEL')
})

test('phrasing helpers render semantic elements', () => {
  render(
    <>
      <Strong>strong</Strong>
      <Em>em</Em>
      <Quote>quote</Quote>
    </>,
  )

  expect(screen.getByText('strong').tagName).toBe('STRONG')
  expect(screen.getByText('em').tagName).toBe('EM')
  expect(screen.getByText('quote').tagName).toBe('Q')
})

test('exposes phrasing helpers through the Text namespace', () => {
  expect(Text.Strong).toBe(Strong)
  expect(Text.Em).toBe(Em)
  expect(Text.Quote).toBe(Quote)
})

test('forwards refs and attributes', () => {
  const ref = createRef<HTMLElement>()

  render(
    <Text ref={ref} data-testid="text">
      Body
    </Text>,
  )

  expect(screen.getByTestId('text')).toBe(ref.current)
})
