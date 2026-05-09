import { act, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Toaster, toast } from './toast'

afterEach(() => {
  act(() => {
    toast.dismiss()
  })
})

test('renders an accessible toaster region without axe violations', async () => {
  const { container } = render(<Toaster />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)
  expect(screen.getByLabelText('Notifications alt+T')).toBeInTheDocument()
})

test('toast() shows a message in the live region', async () => {
  render(<Toaster />)

  act(() => {
    toast('Project saved', { description: 'Visible to teammates.' })
  })

  expect(await screen.findByText('Project saved')).toBeInTheDocument()
  expect(screen.getByText('Visible to teammates.')).toBeInTheDocument()
})

test('applies stalk-toast slot classes to toaster and toast parts', async () => {
  render(<Toaster />)

  act(() => {
    toast('Headline', { description: 'Body text.' })
  })

  const title = await screen.findByText('Headline')
  expect(title).toHaveClass('stalk-toast__title')
  expect(screen.getByText('Body text.')).toHaveClass('stalk-toast__description')
  expect(document.querySelector('[data-sonner-toaster]')).toHaveClass('stalk-toast__toaster')
})
