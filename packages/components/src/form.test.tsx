import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'

interface Values {
  bio: string
}

const DemoForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const form = useForm<Values>({ defaultValues: { bio: '' } })
  return (
    <Form {...form}>
      <form onSubmit={(event) => void form.handleSubmit(() => onSubmit?.())(event)}>
        <FormField
          control={form.control}
          name="bio"
          rules={{ required: 'Bio is required.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <textarea {...field} />
              </FormControl>
              <FormDescription>About you.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Save</button>
      </form>
    </Form>
  )
}

test('associates label, description, and control without axe violations', async () => {
  const { container } = render(<DemoForm />)
  const results = await axe(container)

  expect(results.violations).toHaveLength(0)

  const control = screen.getByLabelText('Bio')
  expect(control).toHaveAttribute('aria-describedby', expect.stringContaining('description'))
  expect(control).toHaveAttribute('aria-invalid', 'false')
})

test('surfaces validation errors and wires them to the control', async () => {
  const user = userEvent.setup()
  render(<DemoForm />)

  await user.click(screen.getByRole('button', { name: 'Save' }))

  expect(await screen.findByText('Bio is required.')).toBeInTheDocument()
  await waitFor(() => {
    expect(screen.getByLabelText('Bio')).toHaveAttribute('aria-invalid', 'true')
  })
})

const DetachedLabel = () => {
  const form = useForm()
  return (
    <Form {...form}>
      <FormLabel>Detached</FormLabel>
    </Form>
  )
}

test('throws when field hooks render outside a FormField', () => {
  expect(() => render(<DetachedLabel />)).toThrow(/must be used within <FormField>/)
})
