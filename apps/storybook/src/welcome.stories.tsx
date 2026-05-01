import { css } from 'styled-system/css'

import type { Meta, StoryObj } from '@storybook/react-vite'

const page = css({
  maxWidth: '52rem',
  marginInline: 'auto',
  padding: '2rem',
  display: 'grid',
  gap: '2rem',
  fontFamily: 'sans',
  color: 'fg.default',
})

const header = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.875rem',
})

const mark = css({
  width: '2.5rem',
  height: '2.5rem',
  display: 'block',
})

const wordmark = css({
  fontSize: '1.5rem',
  fontWeight: 700,
  letterSpacing: '-0.01em',
})

const eyebrow = css({
  margin: 0,
  fontSize: '0.8125rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'fg.muted',
})

const headline = css({
  margin: 0,
  fontSize: 'clamp(2rem, 4.5vw, 2.75rem)',
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  textWrap: 'balance',
})

const lede = css({
  margin: 0,
  fontSize: '1.0625rem',
  lineHeight: 1.6,
  color: 'fg.muted',
  textWrap: 'pretty',
  maxWidth: '40rem',
})

const sectionTitle = css({
  margin: '0 0 0.75rem',
  fontSize: '0.9375rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'fg.muted',
})

const grid = css({
  display: 'grid',
  gap: '0.75rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
})

const card = css({
  display: 'grid',
  gap: '0.375rem',
  padding: '1rem 1.125rem',
  borderRadius: 'lg',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'border.default',
  background: 'bg.subtle',
})

const cardTitle = css({
  margin: 0,
  fontSize: '0.9375rem',
  fontWeight: 700,
  letterSpacing: '-0.005em',
})

const cardBody = css({
  margin: 0,
  fontSize: '0.875rem',
  lineHeight: 1.55,
  color: 'fg.muted',
})

const linkRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem 1.25rem',
  alignItems: 'center',
})

const link = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.375rem',
  fontWeight: 600,
  fontSize: '0.875rem',
  color: 'accent.fg',
  textDecoration: 'none',
  _hover: { textDecoration: 'underline' },
})

const kbd = css({
  display: 'inline-block',
  padding: '0.125rem 0.375rem',
  borderRadius: 'sm',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'border.default',
  background: 'bg.muted',
  fontFamily: 'mono',
  fontSize: '0.75rem',
  lineHeight: 1,
  color: 'fg.default',
})

const hint = css({
  margin: 0,
  fontSize: '0.875rem',
  color: 'fg.muted',
  lineHeight: 1.55,
})

const Welcome = () => (
  <article className={page}>
    <header className={header}>
      <img alt="" aria-hidden="true" className={mark} src="./stalk-ui-logo.svg" />
      <span className={wordmark}>Stalk UI</span>
    </header>

    <section className={css({ display: 'grid', gap: '0.75rem' })}>
      <p className={eyebrow}>Storybook</p>
      <h1 className={headline}>
        A living catalog of Stalk UI components, themes, and accessibility coverage.
      </h1>
      <p className={lede}>
        Every story renders the same source that ships through{' '}
        <code className={css({ fontFamily: 'mono', fontSize: '0.95em' })}>@stalk-ui/cli</code> and
        the static registry manifests. Use the toolbar to flip <strong>color mode</strong>,{' '}
        <strong>theme</strong>, and <strong>direction</strong> without leaving the page.
      </p>
    </section>

    <section>
      <p className={sectionTitle}>What you can do here</p>
      <div className={grid}>
        <div className={card}>
          <h2 className={cardTitle}>Browse components</h2>
          <p className={cardBody}>
            Each component lives under <em>Components</em> in the sidebar with variants, sizes, and
            edge cases.
          </p>
        </div>
        <div className={card}>
          <h2 className={cardTitle}>Inspect tokens</h2>
          <p className={cardBody}>
            <em>Foundation &rsaquo; Semantic tokens</em> opens the MDX docs (ColorPalette + full
            token tables). Use the toolbar <strong>mode</strong> for preview light/dark.
          </p>
        </div>
        <div className={card}>
          <h2 className={cardTitle}>Verify a11y</h2>
          <p className={cardBody}>
            The a11y panel runs axe on each story; failures are CI-blocking.
          </p>
        </div>
        <div className={card}>
          <h2 className={cardTitle}>Toggle themes</h2>
          <p className={cardBody}>
            Use the toolbar for <strong>mode</strong> (preview light/dark),{' '}
            <strong>pandaTheme</strong> (neutral vs rainbow), and RTL. The moon/sun control only
            changes the Storybook shell; it does not drive the preview iframe.
          </p>
        </div>
      </div>
    </section>

    <section>
      <p className={sectionTitle}>Keyboard</p>
      <p className={hint}>
        <span className={kbd}>S</span> toggles the sidebar &middot; <span className={kbd}>A</span>{' '}
        toggles addons &middot; <span className={kbd}>F</span> fullscreen &middot;{' '}
        <span className={kbd}>D</span> jumps to docs.
      </p>
    </section>

    <section>
      <p className={sectionTitle}>Resources</p>
      <div className={linkRow}>
        <a className={link} href="https://stalk-ui.com" rel="noreferrer" target="_blank">
          Documentation &rarr;
        </a>
        <a
          className={link}
          href="https://stalk-ui.com/r/integrity.json"
          rel="noreferrer"
          target="_blank"
        >
          Registry index &rarr;
        </a>
        <a
          className={link}
          href="https://github.com/trystendsmyth/stalk-ui"
          rel="noreferrer"
          target="_blank"
        >
          GitHub &rarr;
        </a>
      </div>
    </section>
  </article>
)

const meta = {
  title: 'Welcome',
  component: Welcome,
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
    a11y: { test: 'error' },
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof Welcome>

export default meta

type Story = StoryObj<typeof meta>

export const Introduction: Story = {}
