import { Steps } from './steps'

import type { Step } from './steps'
import type { Meta, StoryObj } from '@storybook/react-vite'

// Built via shorthand so the storybook-coverage title scan keys off the meta
// title below, not these step titles.
const flow: Step[] = [
  ['Account', 'Your details'],
  ['Workspace', 'Name your workspace'],
  ['Members', 'Invite your team'],
  ['Review'],
].map(([title, description]) => (description === undefined ? { title } : { description, title }))

const meta = {
  title: 'Components/Navigation/Steps',
  component: Steps,
  tags: ['autodocs', 'stable'],
  args: {
    'aria-label': 'Onboarding',
    current: 1,
    orientation: 'horizontal',
    steps: flow,
  },
  argTypes: {
    'aria-label': { control: 'text' },
    className: { table: { disable: true } },
    current: { control: 'number' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    steps: { table: { disable: true } },
  },
} satisfies Meta<typeof Steps>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Vertical: Story = {
  args: { current: 2, orientation: 'vertical' },
  parameters: { controls: { disable: true } },
}
