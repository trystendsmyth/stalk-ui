import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Label } from './label'

afterEach(() => {
  cleanup()
})

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(
    <>
      <Label htmlFor={`${size}-field`} size={size}>
        {size} label
      </Label>
      <input id={`${size}-field`} />
    </>,
  )
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByLabelText(`${size} label`)).toBeInTheDocument()
})

test('associates with form controls', async () => {
  const user = userEvent.setup()

  render(
    <>
      <Label htmlFor="email">Email</Label>
      <input id="email" />
    </>,
  )

  await user.click(screen.getByText('Email'))

  expect(screen.getByLabelText('Email')).toHaveFocus()
})

test('marks required labels for styling hooks', () => {
  render(
    <Label required htmlFor="name">
      Name
    </Label>,
  )

  const label = screen.getByText('Name')
  expect(label).toHaveAttribute('data-required', '')
})
