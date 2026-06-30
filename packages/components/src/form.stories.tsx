import { useForm } from 'react-hook-form'

import { Button } from './button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import { Textarea } from './textarea'

import type { Meta, StoryObj } from '@storybook/react-vite'

interface ProfileValues {
  bio: string
}

// Form requires a `useForm` instance, so the documented usage is wrapped in a
// self-contained demo the stories (and docs preview) can render directly.
const ProfileForm = () => {
  const form = useForm<ProfileValues>({ defaultValues: { bio: '' } })

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => void form.handleSubmit(() => undefined)(event)}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '24rem' }}
      >
        <FormField
          control={form.control}
          name="bio"
          rules={{ required: 'Tell us a little about yourself.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="I build things…" {...field} />
              </FormControl>
              <FormDescription>This appears on your public profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}

const meta = {
  title: 'Components/Forms/Form',
  component: ProfileForm,
  tags: ['autodocs', 'stable'],
  // Self-contained demo (no props) composed via children — hide the empty controls.
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof ProfileForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
