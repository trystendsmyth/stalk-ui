import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Steps } from './steps'

const steps = [
  { title: 'Account', description: 'Your details' },
  { title: 'Site', description: 'Pick a site' },
  { title: 'Review' },
]

test('renders the flow with complete/current/upcoming states', async () => {
  const { container } = render(<Steps aria-label="Setup" current={1} steps={steps} />)
  const items = screen.getAllByRole('listitem')

  expect(items).toHaveLength(3)
  expect(items[0]).toHaveAttribute('data-state', 'complete')
  expect(items[1]).toHaveAttribute('data-state', 'current')
  expect(items[1]).toHaveAttribute('aria-current', 'step')
  expect(items[2]).toHaveAttribute('data-state', 'upcoming')
  expect((await axe(container)).violations).toHaveLength(0)
})

test('numbers upcoming steps and checkmarks complete ones', () => {
  const { container } = render(<Steps aria-label="Setup" current={1} steps={steps} />)

  // Step 1 is complete → an svg check, not the number.
  expect(container.querySelector('svg')).toBeInTheDocument()
  expect(screen.getByText('2')).toBeInTheDocument()
  expect(screen.getByText('3')).toBeInTheDocument()
})
