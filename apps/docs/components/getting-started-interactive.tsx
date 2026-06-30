'use client'

import { useState, type ReactNode } from 'react'

type ThemeName = 'monochrome' | 'neutral' | 'rainbow'

interface GettingStartedInteractiveProps {
  slug: string
}

interface Option<T extends string> {
  label: string
  value: T
}

const themeOptions = [
  { label: 'Neutral', value: 'neutral' },
  { label: 'Rainbow', value: 'rainbow' },
  { label: 'Monochrome', value: 'monochrome' },
] as const satisfies readonly Option<ThemeName>[]

const sectionCopy = {
  installation: {
    title: 'Install path',
    hint: 'Switch package managers and preview the exact CLI steps plus generated files.',
  },
  theming: {
    title: 'Theme switcher',
    hint: 'Preview the built-in theme attribute before applying it to an app or subtree.',
  },
  customization: {
    title: 'Customize a card',
    hint: 'Pick an accent and edit the title — the card rethemes live, and the same accent flows straight into defineTheme.',
  },
  registry: {
    title: 'Registry route',
    hint: 'Compare the native Panda registry with the shadcn-compatible output.',
  },
  'semantic-tokens': {
    title: 'Token map',
    hint: 'Watch semantic aliases remap across built-in themes without changing component code.',
  },
  typography: {
    title: 'Type stack',
    hint: 'Try locale-specific stacks while keeping components pointed at fonts.sans.',
  },
} as const

type SupportedSlug = keyof typeof sectionCopy

const installCommands = {
  pnpm: ['pnpm dlx @stalk-ui/cli init', 'pnpm dlx @stalk-ui/cli add button'],
  npm: ['npx @stalk-ui/cli init', 'npx @stalk-ui/cli add button'],
  yarn: ['yarn dlx @stalk-ui/cli init', 'yarn dlx @stalk-ui/cli add button'],
  bun: ['bunx @stalk-ui/cli init', 'bunx @stalk-ui/cli add button'],
} as const

type PackageManager = keyof typeof installCommands

const packageManagerOptions = [
  { label: 'pnpm', value: 'pnpm' },
  { label: 'npm', value: 'npm' },
  { label: 'yarn', value: 'yarn' },
  { label: 'bun', value: 'bun' },
] as const satisfies readonly Option<PackageManager>[]

const registryModes = {
  native: {
    label: 'Native',
    title: 'Stalk CLI',
    endpoint: '/r/button.json',
    command: 'pnpm dlx @stalk-ui/cli add button',
    details: ['Copied source component', 'Panda recipe imports', 'Runtime dependency hints'],
  },
  shadcn: {
    label: 'shadcn',
    title: 'Compatibility manifest',
    endpoint: '/r/shadcn/button.json',
    command: 'pnpm dlx shadcn@latest add https://stalk-ui.com/r/shadcn/button.json',
    details: ['shadcn-compatible JSON', 'Same Panda-native source', 'Secondary migration path'],
  },
} as const

type RegistryMode = keyof typeof registryModes

const registryOptions = [
  { label: 'Native', value: 'native' },
  { label: 'shadcn', value: 'shadcn' },
] as const satisfies readonly Option<RegistryMode>[]

type AccentScale = 'teal' | 'blue' | 'violet' | 'emerald' | 'red'

const accentOptions = [
  { label: 'Teal', value: 'teal' },
  { label: 'Blue', value: 'blue' },
  { label: 'Violet', value: 'violet' },
  { label: 'Emerald', value: 'emerald' },
  { label: 'Red', value: 'red' },
] as const satisfies readonly Option<AccentScale>[]

const typographyProfiles = {
  latin: {
    label: 'Latin',
    dir: 'ltr',
    sample: 'Build polished interfaces with copied source components.',
    stack: '"Noto Sans", var(--font-sans, system-ui, sans-serif)',
    code: '--font-sans: "Noto Sans", system-ui, sans-serif;',
  },
  arabic: {
    label: 'Arabic',
    dir: 'rtl',
    sample: 'صمم واجهات دقيقة بمكونات مصدرية قابلة للنسخ.',
    stack: '"Noto Sans Arabic", var(--font-sans, system-ui, sans-serif)',
    code: '--font-sans: "Noto Sans Arabic", system-ui, sans-serif;',
  },
  japanese: {
    label: 'Japanese',
    dir: 'ltr',
    sample: 'コピー可能なソースコンポーネントで洗練されたUIを構築します。',
    stack: '"Noto Sans JP", var(--font-sans, system-ui, sans-serif)',
    code: '--font-sans: "Noto Sans JP", system-ui, sans-serif;',
  },
} as const

type TypographyProfile = keyof typeof typographyProfiles

const typographyOptions = [
  { label: 'Latin', value: 'latin' },
  { label: 'Arabic', value: 'arabic' },
  { label: 'Japanese', value: 'japanese' },
] as const satisfies readonly Option<TypographyProfile>[]

const themeLabels: Record<ThemeName, string> = {
  monochrome: 'Monochrome',
  neutral: 'Neutral',
  rainbow: 'Rainbow',
}

const tokenNames = [
  'bg.default',
  'fg.default',
  'fg.muted',
  'border.default',
  'accent.solid',
  'success.solid',
  'warning.solid',
  'danger.solid',
] as const

const isSupportedSlug = (slug: string): slug is SupportedSlug => slug in sectionCopy

const themeAttribute = (theme: ThemeName) => (theme === 'neutral' ? undefined : theme)

export function GettingStartedInteractive({ slug }: GettingStartedInteractiveProps) {
  if (!isSupportedSlug(slug)) return null

  const copy = sectionCopy[slug]

  return (
    <section className="docs-section">
      <header className="docs-section__header">
        <h2 className="docs-section__title">{copy.title}</h2>
        <p className="docs-section__hint">{copy.hint}</p>
      </header>
      {slug === 'installation' ? <InstallationBlock /> : null}
      {slug === 'theming' ? <ThemingBlock /> : null}
      {slug === 'customization' ? <CustomizationBlock /> : null}
      {slug === 'registry' ? <RegistryBlock /> : null}
      {slug === 'semantic-tokens' ? <SemanticTokensBlock /> : null}
      {slug === 'typography' ? <TypographyBlock /> : null}
    </section>
  )
}

function InstallationBlock() {
  const [manager, setManager] = useState<PackageManager>('pnpm')
  const commands = installCommands[manager]

  return (
    <div className="docs-interactive">
      <SegmentedControl
        label="Package manager"
        options={packageManagerOptions}
        value={manager}
        onChange={setManager}
      />
      <div className="docs-interactive__grid">
        <Panel title="Commands">
          <CodeBlock code={commands.join('\n')} />
        </Panel>
        <Panel title="What changes">
          <ul className="docs-interactive__list">
            <li>
              <code>stalk.config.json</code> tracks registry preferences.
            </li>
            <li>
              <code>panda.config.ts</code> receives the Stalk preset.
            </li>
            <li>Runtime packages are added to the app.</li>
          </ul>
        </Panel>
      </div>
    </div>
  )
}

function ThemingBlock() {
  const [theme, setTheme] = useState<ThemeName>('neutral')
  const code =
    theme === 'neutral'
      ? '<html>'
      : `<html data-panda-theme="${theme}">\n  <div data-panda-theme="${theme}">...</div>\n</html>`

  return (
    <div className="docs-interactive">
      <SegmentedControl label="Theme" options={themeOptions} value={theme} onChange={setTheme} />
      <div className="docs-interactive__grid">
        <ThemePreview theme={theme} />
        <Panel title="Attribute">
          <CodeBlock code={code} />
        </Panel>
      </div>
    </div>
  )
}

function CustomizationBlock() {
  const [accent, setAccent] = useState<AccentScale>('teal')
  const [title, setTitle] = useState('Project settings')

  // Step 9 is the saturated, near-mode-stable step, so the title/button read in
  // both color modes from the raw scale (real apps set this via defineTheme).
  const solid = `var(--colors-${accent}-9)`
  const code = [
    "import { defineTheme } from '@stalk-ui/preset/theme'",
    '',
    'themes: {',
    `  brand: defineTheme({ accent: '${accent}' }),`,
    '}',
  ].join('\n')

  return (
    <div className="docs-interactive">
      <div className="docs-interactive__controls">
        <SegmentedControl
          label="Accent scale"
          options={accentOptions}
          value={accent}
          onChange={setAccent}
        />
        <label className="docs-interactive__field">
          <span>Card title</span>
          <input
            className="docs-interactive__input"
            maxLength={40}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
            }}
          />
        </label>
      </div>
      <div className="docs-interactive__grid">
        <div className="docs-interactive__preview">
          <span className="docs-interactive__badge">Card</span>
          <strong className="docs-interactive__card-title" style={{ color: solid }}>
            {title || 'Untitled'}
          </strong>
          <p>Group related content and actions on a single bordered surface.</p>
          <div className="docs-interactive__chips">
            <span
              className="docs-interactive__chip"
              style={{ background: solid, borderColor: solid, color: 'var(--colors-gray-1)' }}
            >
              Save
            </span>
            <span className="docs-interactive__chip">Cancel</span>
          </div>
        </div>
        <Panel title="defineTheme">
          <CodeBlock code={code} />
        </Panel>
      </div>
    </div>
  )
}

function RegistryBlock() {
  const [mode, setMode] = useState<RegistryMode>('native')
  const current = registryModes[mode]

  return (
    <div className="docs-interactive">
      <SegmentedControl
        label="Registry mode"
        options={registryOptions}
        value={mode}
        onChange={setMode}
      />
      <div className="docs-interactive__grid">
        <Panel title={current.title}>
          <p className="docs-interactive__meta">{current.endpoint}</p>
          <CodeBlock code={current.command} />
        </Panel>
        <Panel title="Manifest includes">
          <ul className="docs-interactive__list">
            {current.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}

function SemanticTokensBlock() {
  const [theme, setTheme] = useState<ThemeName>('neutral')

  return (
    <div className="docs-interactive">
      <SegmentedControl label="Theme" options={themeOptions} value={theme} onChange={setTheme} />
      <div className="docs-interactive__preview" data-panda-theme={themeAttribute(theme)}>
        <div className="docs-interactive__swatches">
          {tokenNames.map((token) => (
            <span className="docs-interactive__swatch" key={token}>
              <span
                aria-hidden="true"
                className="docs-interactive__swatch-color"
                style={{ background: `var(--colors-${token.replace('.', '-')})` }}
              />
              <code>{token}</code>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function TypographyBlock() {
  const [profile, setProfile] = useState<TypographyProfile>('latin')
  const current = typographyProfiles[profile]

  return (
    <div className="docs-interactive">
      <SegmentedControl
        label="Script"
        options={typographyOptions}
        value={profile}
        onChange={setProfile}
      />
      <div className="docs-interactive__grid">
        <Panel title="Specimen">
          <p
            className="docs-interactive__specimen"
            dir={current.dir}
            style={{ fontFamily: current.stack }}
          >
            {current.sample}
          </p>
        </Panel>
        <Panel title="CSS variable">
          <CodeBlock code={current.code} />
        </Panel>
      </div>
    </div>
  )
}

interface SegmentedControlProps<T extends string> {
  label: string
  onChange: (value: T) => void
  options: readonly Option<T>[]
  value: T
}

function SegmentedControl<T extends string>({
  label,
  onChange,
  options,
  value,
}: SegmentedControlProps<T>) {
  return (
    <div aria-label={label} className="docs-interactive__segments" role="group">
      {options.map((option) => (
        <button
          aria-pressed={option.value === value}
          className="docs-interactive__segment"
          key={option.value}
          type="button"
          onClick={() => {
            onChange(option.value)
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function Panel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="docs-interactive__panel">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="docs-interactive__code">
      <code>{code}</code>
    </pre>
  )
}

function ThemePreview({ theme }: { theme: ThemeName }) {
  return (
    <div className="docs-interactive__preview" data-panda-theme={themeAttribute(theme)}>
      <span className="docs-interactive__badge">Live surface</span>
      <strong>{themeLabels[theme]}</strong>
      <p>Components keep the same semantic token names while the theme remaps values.</p>
      <div className="docs-interactive__chips">
        <span className="docs-interactive__chip docs-interactive__chip--solid">Primary</span>
        <span className="docs-interactive__chip">Secondary</span>
      </div>
    </div>
  )
}
