import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Button } from './button'

const variants = ['solid', 'outline', 'ghost', 'subtle'] as const

test.each(variants)('renders %s variant without axe violations', async (variant) => {
  const { container } = render(<Button variant={variant}>{variant}</Button>)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('button', { name: variant })).toBeInTheDocument()
})

test('supports keyboard activation with enter and space', async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()

  render(<Button onClick={handleClick}>Save</Button>)

  const button = screen.getByRole('button', { name: 'Save' })
  await user.tab()
  expect(button).toHaveFocus()

  await user.keyboard('{Enter}')
  await user.keyboard(' ')

  expect(handleClick).toHaveBeenCalledTimes(2)
})

test('exposes accessible labels and descriptions', () => {
  render(
    <>
      <p id="save-description">Persists the draft.</p>
      <Button aria-describedby="save-description" aria-label="Save draft">
        Save
      </Button>
    </>,
  )

  const button = screen.getByRole('button', { name: 'Save draft' })
  expect(button).toHaveAccessibleDescription('Persists the draft.')
})

test('disables interaction while loading', async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()

  render(
    <Button loading onClick={handleClick}>
      Saving
    </Button>,
  )

  // Default loadingLabel is the announced name; the original "Saving" text
  // remains in the DOM but is aria-hidden for layout stability.
  const button = screen.getByRole('button', { name: 'Loading' })
  expect(button).toBeDisabled()
  expect(button).toHaveAttribute('aria-busy', 'true')

  await user.click(button)
  expect(handleClick).not.toHaveBeenCalled()
})

test('announces a custom loadingLabel while preserving original children', () => {
  render(
    <Button loading loadingLabel="Saving changes">
      Save
    </Button>,
  )

  // Original "Save" stays in the DOM (layout-stable) but is aria-hidden, so
  // the accessible name comes from the VisuallyHidden loadingLabel.
  expect(screen.getByRole('button', { name: 'Saving changes' })).toBeInTheDocument()
  expect(screen.getByText('Save')).toBeInTheDocument()
})

test('renders children unchanged when not loading', () => {
  render(
    <Button>
      <span data-testid="custom">Hello</span>
    </Button>,
  )

  expect(screen.getByTestId('custom')).toBeInTheDocument()
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
})

test('renders as a child element', async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()

  render(
    <Button asChild onClick={handleClick}>
      <a href="/docs">Read docs</a>
    </Button>,
  )

  const link = screen.getByRole('link', { name: 'Read docs' })
  await user.click(link)

  expect(link).toHaveAttribute('href', '/docs')
  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('prevents child interaction while loading', async () => {
  const user = userEvent.setup()
  const handleClick = vi.fn()

  render(
    <Button asChild loading onClick={handleClick}>
      <a href="/docs">Read docs</a>
    </Button>,
  )

  const link = screen.getByRole('link', { name: 'Read docs' })
  await user.click(link)

  expect(link).toHaveAttribute('aria-disabled', 'true')
  expect(handleClick).not.toHaveBeenCalled()
})
