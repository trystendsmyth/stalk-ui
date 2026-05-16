import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import {
  AlertActions,
  AlertBody,
  AlertClose,
  AlertDescription,
  AlertIcon,
  AlertRoot,
  AlertTitle,
} from './alert'
import { TONES } from './tones'

test.each(TONES)('renders %s tone without axe violations', async (tone) => {
  const { container } = render(
    <AlertRoot tone={tone}>
      <AlertBody>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </AlertBody>
    </AlertRoot>,
  )
  const results = await axe(container)
  expect(results.violations).toHaveLength(0)
})

test('uses role="alert" by default', () => {
  render(
    <AlertRoot>
      <AlertBody>
        <AlertTitle>Heads up</AlertTitle>
      </AlertBody>
    </AlertRoot>,
  )
  expect(screen.getByRole('alert')).toBeInTheDocument()
})

test('renders composed title and description', () => {
  render(
    <AlertRoot>
      <AlertBody>
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>Your changes were saved.</AlertDescription>
      </AlertBody>
    </AlertRoot>,
  )
  expect(screen.getByText('Saved')).toBeInTheDocument()
  expect(screen.getByText('Your changes were saved.')).toBeInTheDocument()
})

test('AlertClose forwards onClick and aria-label', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()
  render(
    <AlertRoot>
      <AlertBody>
        <AlertTitle>Heads up</AlertTitle>
      </AlertBody>
      <AlertClose aria-label="Dismiss alert" onClick={onClose}>
        x
      </AlertClose>
    </AlertRoot>,
  )
  await user.click(screen.getByRole('button', { name: 'Dismiss alert' }))
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('AlertIcon is decorative by default', () => {
  render(
    <AlertRoot>
      <AlertIcon data-testid="icon">
        <svg />
      </AlertIcon>
      <AlertBody>
        <AlertTitle>Custom</AlertTitle>
      </AlertBody>
    </AlertRoot>,
  )
  expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true')
})

test('supports AlertActions composition', () => {
  render(
    <AlertRoot>
      <AlertBody>
        <AlertTitle>Failed</AlertTitle>
        <AlertDescription>Try again</AlertDescription>
        <AlertActions>
          <button type="button">Retry</button>
        </AlertActions>
      </AlertBody>
    </AlertRoot>,
  )
  expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
})

test('subcomponents throw when used outside AlertRoot', () => {
  const noop = () => undefined
  const spy = vi.spyOn(console, 'error').mockImplementation(noop)
  expect(() => render(<AlertTitle>Loose</AlertTitle>)).toThrow(/inside <AlertRoot>/)
  spy.mockRestore()
})

test('AlertRoot forwards refs', () => {
  const ref = createRef<HTMLDivElement>()
  render(
    <AlertRoot ref={ref} data-testid="alert">
      <AlertBody>
        <AlertTitle>x</AlertTitle>
      </AlertBody>
    </AlertRoot>,
  )
  expect(screen.getByTestId('alert')).toBe(ref.current)
})
