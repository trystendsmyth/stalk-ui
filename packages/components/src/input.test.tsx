import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Input } from './input'

const sizes = ['sm', 'md', 'lg'] as const

describe('Input sugar', () => {
  test.each(sizes)('renders %s size without axe violations', async (size) => {
    const { container } = render(<Input aria-label={`${size} input`} size={size} />)
    const results = await axe(container)

    expect(results.violations).toHaveLength(0)
    expect(screen.getByRole('textbox', { name: `${size} input` })).toBeInTheDocument()
  })

  test('supports external label and description through ARIA attributes', async () => {
    const user = userEvent.setup()

    render(
      <>
        <label htmlFor="email">Email</label>
        <p id="email-description">Used for product updates.</p>
        <Input id="email" aria-describedby="email-description" />
      </>,
    )

    const input = screen.getByRole('textbox', { name: 'Email' })
    await user.type(input, 'hello@stalk-ui.com')

    expect(input).toHaveAccessibleDescription('Used for product updates.')
    expect(input).toHaveValue('hello@stalk-ui.com')
  })

  test('marks invalid fields for assistive technology', () => {
    render(<Input invalid aria-label="Email" />)

    const input = screen.getByRole('textbox', { name: 'Email' })
    expect(input).toBeInvalid()
    expect(input).toHaveAttribute('data-invalid', '')
  })

  test('does not accept input while disabled', async () => {
    const user = userEvent.setup()

    render(<Input disabled aria-label="Disabled input" />)

    const input = screen.getByRole('textbox', { name: 'Disabled input' })
    await user.type(input, 'ignored')

    expect(input).toBeDisabled()
    expect(input).toHaveValue('')
  })

  test('renders prefix and suffix slots through props', () => {
    render(<Input aria-label="Amount" endSlot={<span>USD</span>} startSlot={<span>$</span>} />)

    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Amount' })).toBeInTheDocument()
  })
})

describe('Input compound', () => {
  test('renders compound parts and forwards refs', () => {
    render(
      <Input.Root size="lg">
        <Input.Prefix>
          <span>$</span>
        </Input.Prefix>
        <Input.Field aria-label="Amount" />
        <Input.Suffix>
          <span>USD</span>
        </Input.Suffix>
      </Input.Root>,
    )

    const field = screen.getByRole('textbox', { name: 'Amount' })
    expect(field).toBeInTheDocument()
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  test('focuses the input when clicking the shell background', () => {
    const { container } = render(
      <Input.Root>
        <Input.Field aria-label="Amount" />
      </Input.Root>,
    )

    const field = screen.getByRole('textbox', { name: 'Amount' })
    const root = container.firstElementChild

    if (root === null) {
      throw new Error('expected root element to be rendered')
    }

    fireEvent.pointerDown(root)

    expect(field).toHaveFocus()
  })

  test('places the cursor at the end when clicking an end slot background', () => {
    render(
      <Input.Root>
        <Input.Field aria-label="Email" defaultValue="hello@stalk-ui.com" />
        <Input.Suffix>
          <span>@stalk-ui.com</span>
        </Input.Suffix>
      </Input.Root>,
    )

    const field = screen.getByRole<HTMLInputElement>('textbox', { name: 'Email' })
    const suffix = screen.getByText('@stalk-ui.com').closest('[data-stalk-input-slot]')

    if (suffix === null) {
      throw new Error('expected the end slot to be rendered')
    }

    fireEvent.pointerDown(suffix)

    expect(field).toHaveFocus()
    expect(field.selectionStart).toBe(field.value.length)
    expect(field.selectionEnd).toBe(field.value.length)
  })

  test('places the cursor at the start when clicking a start slot background', () => {
    render(
      <Input.Root>
        <Input.Prefix>
          <span>$</span>
        </Input.Prefix>
        <Input.Field aria-label="Amount" defaultValue="125.00" />
      </Input.Root>,
    )

    const field = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' })
    const prefix = screen.getByText('$').closest('[data-stalk-input-slot]')

    if (prefix === null) {
      throw new Error('expected the start slot to be rendered')
    }

    fireEvent.pointerDown(prefix)

    expect(field).toHaveFocus()
    expect(field.selectionStart).toBe(0)
    expect(field.selectionEnd).toBe(0)
  })

  test('does not steal pointer events from interactive children', () => {
    let buttonClicked = false

    render(
      <Input.Root>
        <Input.Field aria-label="Search" />
        <Input.Suffix>
          <button
            aria-label="Clear"
            onClick={() => {
              buttonClicked = true
            }}
            type="button"
          >
            Clear
          </button>
        </Input.Suffix>
      </Input.Root>,
    )

    const button = screen.getByRole('button', { name: 'Clear' })
    fireEvent.pointerDown(button)
    fireEvent.click(button)

    expect(buttonClicked).toBe(true)
    expect(screen.getByRole('textbox', { name: 'Search' })).not.toHaveFocus()
  })

  test('disables the field through the root', () => {
    render(
      <Input.Root disabled>
        <Input.Field aria-label="Disabled" />
      </Input.Root>,
    )

    expect(screen.getByRole('textbox', { name: 'Disabled' })).toBeDisabled()
  })

  test('marks invalid through the root', () => {
    const { container } = render(
      <Input.Root invalid>
        <Input.Field aria-label="Email" />
      </Input.Root>,
    )

    expect(container.firstElementChild).toHaveAttribute('data-invalid', '')
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInvalid()
  })
})
