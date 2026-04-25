import type { Meta, StoryObj } from '@storybook/react-vite'

function Placeholder() {
  return (
    <div
      style={{
        border: '1px solid #d4d8e1',
        borderRadius: '16px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '32rem',
        padding: '2rem',
      }}
    >
      <p style={{ marginBlock: 0, color: '#596171', fontSize: '0.875rem', fontWeight: 700 }}>
        Stalk UI Storybook
      </p>
      <h1 style={{ marginBlock: '0.5rem 0', fontSize: '2rem' }}>Placeholder story</h1>
      <p style={{ marginBlockEnd: 0, lineHeight: 1.6 }}>
        This story keeps the Storybook app buildable until component stories are added.
      </p>
    </div>
  )
}

const meta = {
  title: 'Shell/Placeholder',
  component: Placeholder,
} satisfies Meta<typeof Placeholder>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
