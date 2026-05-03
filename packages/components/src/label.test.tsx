import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Input } from './input'
import { Label } from './label'

const sizes = ['sm', 'md', 'lg'] as const

test.each(sizes)('renders %s size without axe violations', async (size) => {
  const { container } = render(
    <>
      <Label htmlFor={`${size}-field`} size={size}>
        {size} label
      </Label>
      <Input id={`${size}-field`} />
    </>,
  )
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByLabelText(`${size} label`)).toBeInTheDocument()
})

test('associates with form controls through htmlFor', async () => {
  const user = userEvent.setup()

  render(
    <>
      <Label htmlFor="email">Email</Label>
      <Input id="email" />
    </>,
  )

  await user.click(screen.getByText('Email'))

  expect(screen.getByLabelText('Email')).toHaveFocus()
})

test('focuses a nested control without htmlFor', async () => {
  const user = userEvent.setup()

  render(
    <Label>
      Newsletter
      <Input aria-label="Newsletter email" />
    </Label>,
  )

  await user.click(screen.getByText('Newsletter'))

  expect(screen.getByLabelText('Newsletter email')).toHaveFocus()
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
