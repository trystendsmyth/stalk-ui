import {
  ACCENT_COLORS,
  BACKGROUND_COLORS,
  BORDER_COLORS,
  FOREGROUND_COLORS,
  STATUS_COLORS,
} from '@stalk-ui/preset'
import { css, cx } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const swatchBase = css({
  borderRadius: 'md',
  borderWidth: '1px',
  borderColor: 'border.default',
  height: '12',
  minWidth: '0',
})

const swatchBg = (token: string) =>
  cx(
    swatchBase,
    css({
      backgroundColor: token as 'bg.default',
    }),
  )

const swatchFg = (token: string) =>
  cx(
    swatchBase,
    css({
      color: token as 'fg.default',
    }),
  )

const swatchBorder = (token: string) =>
  cx(
    swatchBase,
    css({
      borderColor: token as 'border.default',
    }),
  )

const canvasPad = css({
  backgroundColor: 'bg.canvas',
  borderRadius: 'md',
  padding: '2',
})

const SwatchGrid = ({
  title,
  tokens,
  variant,
}: {
  title: string
  tokens: readonly string[]
  variant: 'backgroundColor' | 'color' | 'borderColor'
}) => (
  <section style={{ marginBlockEnd: '2rem' }}>
    <h3 style={{ fontSize: '1rem', marginBlockEnd: '0.75rem' }}>{title}</h3>
    <div
      style={{
        display: 'grid',
        gap: '0.75rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
      }}
    >
      {tokens.map((token) => (
        <figure key={token} style={{ margin: 0 }}>
          {variant === 'color' ? (
            <div className={canvasPad}>
              <div className={swatchFg(token)} />
            </div>
          ) : variant === 'borderColor' ? (
            <div className={swatchBorder(token)} />
          ) : (
            <div className={swatchBg(token)} />
          )}
          <figcaption
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.75rem',
              marginBlockStart: '0.35rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={token}
          >
            {token}
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
)

const pageShell = css({
  backgroundColor: 'bg.default',
  padding: '6',
})

const darkShell = css({
  backgroundColor: 'bg.canvas',
  color: 'fg.default',
  padding: '6',
})

const meta = {
  title: 'Foundation/Semantic tokens',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Light: Story = {
  render: () => (
    <div className={pageShell} data-color-mode="light">
      <SwatchGrid title="Background" tokens={BACKGROUND_COLORS} variant="backgroundColor" />
      <SwatchGrid title="Foreground" tokens={FOREGROUND_COLORS} variant="color" />
      <SwatchGrid title="Border" tokens={BORDER_COLORS} variant="borderColor" />
      <SwatchGrid title="Accent" tokens={ACCENT_COLORS} variant="backgroundColor" />
      <SwatchGrid title="Status" tokens={STATUS_COLORS} variant="backgroundColor" />
    </div>
  ),
}

export const Dark: Story = {
  render: () => (
    <div className={darkShell} data-color-mode="dark">
      <SwatchGrid title="Background" tokens={BACKGROUND_COLORS} variant="backgroundColor" />
      <SwatchGrid title="Foreground" tokens={FOREGROUND_COLORS} variant="color" />
      <SwatchGrid title="Border" tokens={BORDER_COLORS} variant="borderColor" />
      <SwatchGrid title="Accent" tokens={ACCENT_COLORS} variant="backgroundColor" />
      <SwatchGrid title="Status" tokens={STATUS_COLORS} variant="backgroundColor" />
    </div>
  ),
}
