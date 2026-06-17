import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Carousel } from './carousel'

const Example = () => (
  <Carousel>
    <Carousel.Content>
      <Carousel.Item>Slide one</Carousel.Item>
      <Carousel.Item>Slide two</Carousel.Item>
      <Carousel.Item>Slide three</Carousel.Item>
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel>
)

test('exposes a labelled carousel region', () => {
  render(<Example />)
  const region = screen.getByRole('region', { name: 'Carousel' })
  expect(region).toHaveAttribute('aria-roledescription', 'carousel')
})

test('marks each item as a slide', () => {
  render(<Example />)
  const slides = screen.getAllByRole('group')
  expect(slides).toHaveLength(3)
  expect(slides[0]).toHaveAttribute('aria-roledescription', 'slide')
})

test('labels the previous and next controls', () => {
  render(<Example />)
  expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument()
})

test('throws when parts render outside the provider', () => {
  expect(() => render(<Carousel.Item>orphan</Carousel.Item>)).toThrow(
    /must be used within <Carousel>/,
  )
})

test('renders without axe violations', async () => {
  const { container } = render(<Example />)
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('forwards ref to the region element', () => {
  const ref = createRef<HTMLDivElement>()
  render(
    <Carousel ref={ref}>
      <Carousel.Content />
    </Carousel>,
  )
  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
