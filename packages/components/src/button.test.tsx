import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Button } from './button'

afterEach(() => {
  cleanup()
})

const variants = ['solid', 'outline', 'ghost', 'subtle'] as const

test.each(variants)('renders %s variant without axe violations', async (variant) => {
  const { container } = render(<Button variant={variant}>{variant}</Button>)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByRole('button', { name: variant })).toHaveClass(`stalk-button--${variant}`)
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

  const button = screen.getByRole('button', { name: 'Saving' })
  expect(button).toBeDisabled()

  await user.click(button)
  expect(handleClick).not.toHaveBeenCalled()
})
