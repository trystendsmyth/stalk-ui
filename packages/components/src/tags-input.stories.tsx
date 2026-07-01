import { useState } from 'react'
import { VStack } from 'styled-system/jsx'

import { TagsInput } from './tags-input'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Forms/Tags Input',
  component: TagsInput,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Tags',
    placeholder: 'Add a tag…',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'select', options: ['accent', 'success', 'warning', 'danger', 'info'] },
    max: { control: 'number' },
    allowDuplicates: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Multi-value entry that renders each value as a removable Tag chip. Add on Enter or ' +
          'comma, paste comma-separated values, and Backspace removes the last chip.',
      },
    },
  },
} satisfies Meta<typeof TagsInput>

export default meta

type Story = StoryObj<typeof meta>

// Disabled chips are intentionally de-emphasized; their lower contrast is by design.
const noContrast = { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } }

export const Default: Story = {
  args: { defaultValue: ['design', 'engineering'] },
}

export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function Demo() {
      const [tags, setTags] = useState(['react', 'panda'])
      return (
        <VStack alignItems="stretch" gap="8" w="24rem">
          <TagsInput aria-label="Tags" onValueChange={setTags} value={tags} />
          <span>
            {tags.length} tag(s): {tags.join(', ') || '(none)'}
          </span>
        </VStack>
      )
    }
    return <Demo />
  },
}

export const MaxAndTone: Story = {
  args: { defaultValue: ['one', 'two'], max: 5, tone: 'success' },
}

export const Disabled: Story = {
  args: { defaultValue: ['locked', 'readonly'], disabled: true },
  parameters: { ...noContrast },
}

const LABEL_TONES: Record<string, 'accent' | 'success' | 'warning' | 'danger' | 'info'> = {
  bug: 'danger',
  enhancement: 'success',
  question: 'info',
  docs: 'warning',
}

export const PerTagFormat: Story = {
  args: {
    'aria-label': 'Labels',
    defaultValue: ['bug', 'enhancement', 'question', 'docs'],
    placeholder: 'Add a label…',
    // Format the text per tag (lowercase) …
    formatTag: (value) => value.trim().toLowerCase(),
    // … and color/style each tag by its value.
    getTagProps: (value) => ({ tone: LABEL_TONES[value] ?? 'accent' }),
  },
}
