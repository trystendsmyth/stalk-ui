'use client'

import { Badge } from '@stalk-ui/components/badge'
import { Button } from '@stalk-ui/components/button'
import { Card } from '@stalk-ui/components/card'
import { Select } from '@stalk-ui/components/select'
import { Sparkline } from '@stalk-ui/components/sparkline'
import { Switch } from '@stalk-ui/components/switch'
import { defineTheme } from '@stalk-ui/preset/theme'
import { useId, useMemo, useState } from 'react'
import { css } from 'styled-system/css'

import type { AccentColor, DefineThemeOptions, GrayColor } from '@stalk-ui/preset/theme'
import type { CSSProperties, ReactNode } from 'react'

// The scale sets `defineTheme` accepts, so the emitted config always typechecks.
const ACCENTS: AccentColor[] = [
  'blue',
  'violet',
  'teal',
  'emerald',
  'amber',
  'yellow',
  'orange',
  'red',
]
const GRAYS: GrayColor[] = ['gray', 'neutral', 'slate', 'mauve']
const RAMP_SCALES: (AccentColor | GrayColor)[] = [...ACCENTS, ...GRAYS]

type Roundness = 'sharp' | 'default' | 'rounded'

const RADII: Record<Roundness, Record<string, string> | undefined> = {
  sharp: { sm: '0', md: '0', lg: '0', xl: '2px' },
  default: undefined,
  rounded: { sm: '8px', md: '12px', lg: '16px', xl: '22px' },
}

/** A portable theme profile — the shape a CLI install would consume. */
interface ThemeProfile {
  accent: AccentColor
  gray: GrayColor
  vibrant: boolean
  roundness: Roundness
  success: AccentColor
  warning: AccentColor
  danger: AccentColor
  info: AccentColor
  highlight: AccentColor
  sequential: AccentColor | GrayColor
  divergingNeg: AccentColor
  divergingPos: AccentColor
}

const DEFAULTS: ThemeProfile = {
  accent: 'teal',
  gray: 'slate',
  vibrant: false,
  roundness: 'default',
  success: 'emerald',
  warning: 'amber',
  danger: 'red',
  info: 'blue',
  highlight: 'orange',
  sequential: 'teal',
  divergingNeg: 'red',
  divergingPos: 'blue',
}

/** Convert a Panda token reference (`{colors.tealDark.9}`) to a live CSS var (`var(--colors-teal-dark-9)`). */
const tokenRefToVar = (ref: string): string =>
  ref.replace(/\{colors\.([A-Za-z]+)\.(\d+)\}/g, (_match, scale: string, step: string) => {
    const dark = scale.endsWith('Dark')
    const base = dark ? scale.slice(0, -4) : scale
    return `var(--colors-${base}${dark ? '-dark' : ''}-${step})`
  })

interface VarPair {
  light: Record<string, string>
  dark: Record<string, string>
}

const isLeaf = (node: unknown): node is { value: { base: string; _dark: string } } =>
  typeof node === 'object' && node !== null && 'value' in node

/** Flatten `defineTheme`'s semantic-color tree into light/dark CSS-var override maps. */
const flattenColors = (colors: Record<string, unknown>): VarPair => {
  const light: Record<string, string> = {}
  const dark: Record<string, string> = {}

  const walk = (node: Record<string, unknown>, path: string[]) => {
    for (const [key, value] of Object.entries(node)) {
      const next = [...path, key]
      if (isLeaf(value)) {
        const name = `--colors-${next.join('-')}`
        light[name] = tokenRefToVar(value.value.base)
        dark[name] = tokenRefToVar(value.value._dark)
      } else if (typeof value === 'object' && value !== null) {
        walk(value as Record<string, unknown>, next)
      }
    }
  }

  walk(colors, [])
  return { light, dark }
}

const scalesChanged = (profile: ThemeProfile): boolean =>
  profile.sequential !== profile.accent ||
  profile.divergingNeg !== DEFAULTS.divergingNeg ||
  profile.divergingPos !== DEFAULTS.divergingPos

/** Build the `defineTheme` options object from a profile (only the non-default keys). */
const toDefineThemeOptions = (profile: ThemeProfile): DefineThemeOptions => {
  const radii = RADII[profile.roundness]
  return {
    accent: profile.accent,
    gray: profile.gray,
    ...(profile.vibrant ? { vibrant: true } : {}),
    ...(profile.success === DEFAULTS.success ? {} : { success: profile.success }),
    ...(profile.warning === DEFAULTS.warning ? {} : { warning: profile.warning }),
    ...(profile.danger === DEFAULTS.danger ? {} : { danger: profile.danger }),
    ...(profile.info === DEFAULTS.info ? {} : { info: profile.info }),
    ...(profile.highlight === DEFAULTS.highlight ? {} : { highlight: profile.highlight }),
    ...(scalesChanged(profile)
      ? {
          scales: {
            sequential: profile.sequential,
            diverging: [profile.divergingNeg, profile.divergingPos],
          },
        }
      : {}),
    ...(radii
      ? {
          tokens: {
            radii: Object.fromEntries(Object.entries(radii).map(([k, v]) => [k, { value: v }])),
          },
        }
      : {}),
  }
}

/** Pretty-print the `defineTheme(...)` config a consumer pastes into panda.config.ts. */
const toConfigSnippet = (profile: ThemeProfile): string => {
  const lines = [`  accent: '${profile.accent}',`, `  gray: '${profile.gray}',`]
  if (profile.vibrant) lines.push(`  vibrant: true,`)
  if (profile.success !== DEFAULTS.success) lines.push(`  success: '${profile.success}',`)
  if (profile.warning !== DEFAULTS.warning) lines.push(`  warning: '${profile.warning}',`)
  if (profile.danger !== DEFAULTS.danger) lines.push(`  danger: '${profile.danger}',`)
  if (profile.info !== DEFAULTS.info) lines.push(`  info: '${profile.info}',`)
  if (profile.highlight !== DEFAULTS.highlight) lines.push(`  highlight: '${profile.highlight}',`)
  if (scalesChanged(profile)) {
    lines.push(
      `  scales: { sequential: '${profile.sequential}', diverging: ['${profile.divergingNeg}', '${profile.divergingPos}'] },`,
    )
  }
  const radii = RADII[profile.roundness]
  if (radii) {
    const entries = Object.entries(radii)
      .map(([k, v]) => `${k}: { value: '${v}' }`)
      .join(', ')
    lines.push(`  tokens: { radii: { ${entries} } },`)
  }
  return [
    `import { defineConfig } from '@pandacss/dev'`,
    `import { defineTheme } from '@stalk-ui/preset/theme'`,
    ``,
    `export default defineConfig({`,
    `  preflight: true,`,
    `  presets: ['@stalk-ui/preset'],`,
    `  themes: {`,
    `    custom: defineTheme({`,
    ...lines.map((line) => `  ${line}`),
    `    }),`,
    `  },`,
    `  staticCss: { themes: ['custom'] }, // required so the theme CSS is emitted`,
    `})`,
  ].join('\n')
}

const swatchVars = (profile: ThemeProfile): { radii: Record<string, string> } & VarPair => {
  const theme = defineTheme(toDefineThemeOptions(profile)) as {
    semanticTokens?: { colors?: Record<string, unknown> }
    tokens?: { radii?: Record<string, { value: string }> }
  }
  const colors = theme.semanticTokens?.colors ?? {}
  const radii: Record<string, string> = {}
  const tokenRadii = theme.tokens?.radii
  if (tokenRadii) {
    for (const [k, v] of Object.entries(tokenRadii)) radii[`--radii-${k}`] = v.value
  }
  return { ...flattenColors(colors), radii }
}

// ── Chrome (rendered in the page's own theme, so semantic tokens resolve) ──

const labelClass = css({ color: 'fg.muted', fontSize: 'sm', fontWeight: 'medium' })

const controlClass = css({ display: 'flex', flexDirection: 'column', gap: '6' })

const groupClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '14',
  border: '1px solid',
  borderColor: 'border.muted',
  borderRadius: '10px',
  padding: '18',
  margin: '0',
})

const legendClass = css({
  fontSize: 'xs',
  fontWeight: 'semibold',
  color: 'fg.subtle',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  paddingInline: '6',
})

const rowClass = css({ display: 'flex', flexWrap: 'wrap', gap: '18' })

function ScaleSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}) {
  const id = useId()
  return (
    <div className={controlClass}>
      <span id={id} className={labelClass}>
        {label}
      </span>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger aria-labelledby={id} size="sm" className={css({ minW: '8.5rem' })}>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {options.map((option) => (
            <Select.Item key={option} value={option}>
              {option}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  )
}

function ControlGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className={groupClass}>
      <legend className={legendClass}>{title}</legend>
      <div className={rowClass}>{children}</div>
    </fieldset>
  )
}

// ── Preview (rendered under the live-overridden theme vars) ──

const panelClass = css({
  borderRadius: '12px',
  border: '1px solid var(--colors-border-default)',
  background: 'var(--colors-bg-default)',
  color: 'var(--colors-fg-default)',
  padding: '24',
  display: 'flex',
  flexDirection: 'column',
  gap: '14',
})

const trend = [4, 6, 5, 8, 7, 10, 8, 12, 11, 14]

const SEQUENTIAL_STOPS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const DIVERGING_STOPS = [
  'neg-4',
  'neg-3',
  'neg-2',
  'neg-1',
  'mid',
  'pos-1',
  'pos-2',
  'pos-3',
  'pos-4',
]

function Ramp({ caption, vars }: { caption: string; vars: string[] }) {
  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
      <span className={css({ fontSize: 'xs', opacity: 0.6 })}>{caption}</span>
      <div className={css({ display: 'flex', gap: '2', borderRadius: '6px', overflow: 'hidden' })}>
        {vars.map((name) => (
          <span
            key={name}
            className={css({ height: '18', flex: '1' })}
            style={{ background: `var(--colors-${name})` }}
          />
        ))}
      </div>
    </div>
  )
}

function PreviewSurface({ vars, label }: { vars: CSSProperties; label: string }) {
  return (
    <div className={panelClass} style={vars}>
      <span className={css({ fontSize: 'xs', opacity: 0.6 })}>{label}</span>
      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '12', alignItems: 'center' })}>
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" variant="ghost">
          Ghost
        </Button>
        <Button size="sm" tone="danger">
          Delete
        </Button>
      </div>
      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '12', alignItems: 'center' })}>
        <Badge tone="accent">Accent</Badge>
        <Badge tone="success" variant="solid">
          Live
        </Badge>
        <Badge tone="warning">Pending</Badge>
        <Badge tone="danger" variant="outline">
          Error
        </Badge>
        <Badge tone="info">Info</Badge>
        <span
          className={css({
            fontSize: 'xs',
            fontWeight: 'medium',
            borderRadius: '999px',
            paddingBlock: '2',
            paddingInline: '8',
            background: 'var(--colors-highlight-surface)',
            color: 'var(--colors-highlight-text)',
          })}
        >
          New
        </span>
        <Switch defaultChecked aria-label="Setting" />
        <Sparkline data={trend} area showLastPoint aria-label="Trend" />
      </div>
      <Ramp
        caption="Sequential ramp"
        vars={SEQUENTIAL_STOPS.map((s) => `scale-sequential-${String(s)}`)}
      />
      <Ramp caption="Diverging ramp" vars={DIVERGING_STOPS.map((s) => `scale-diverging-${s}`)} />
      <Card.Root>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
          <Card.Description>Surfaces, borders, and accents all retheme live.</Card.Description>
        </Card.Header>
      </Card.Root>
    </div>
  )
}

const preClass = css({
  overflowX: 'auto',
  borderRadius: '8px',
  padding: '18',
  fontSize: 'xs',
  lineHeight: '1.6',
  background: 'bg.subtle',
  border: '1px solid',
  borderColor: 'border.muted',
})

function CodeBlock({
  title,
  code,
  copied,
  onCopy,
}: {
  title: string
  code: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '10' })}>
      <div className={css({ display: 'flex', alignItems: 'center', gap: '12' })}>
        <strong className={css({ fontSize: 'sm' })}>{title}</strong>
        <Button size="sm" variant="outline" onClick={onCopy}>
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className={preClass}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function ThemeBuilder() {
  const [profile, setProfile] = useState<ThemeProfile>(DEFAULTS)
  const [copied, setCopied] = useState<'config' | 'profile' | null>(null)

  const { light, dark, radii } = useMemo(() => swatchVars(profile), [profile])
  const configSnippet = useMemo(() => toConfigSnippet(profile), [profile])
  const jsonProfile = useMemo(() => JSON.stringify(profile, null, 2), [profile])

  const set = <K extends keyof ThemeProfile>(key: K, value: ThemeProfile[K]) => {
    setProfile((current) => ({ ...current, [key]: value }))
  }

  const copy = (text: string, which: 'config' | 'profile') => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(which)
      setTimeout(() => {
        setCopied(null)
      }, 1500)
    })
  }

  const lightVars = { ...light, ...radii } as CSSProperties
  const darkVars = { ...dark, ...radii } as CSSProperties

  return (
    <section className={css({ display: 'flex', flexDirection: 'column', gap: '24', mt: '24' })}>
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '14' })}>
        <ControlGroup title="Core">
          <ScaleSelect
            label="Accent"
            value={profile.accent}
            options={ACCENTS}
            onChange={(value) => {
              set('accent', value as AccentColor)
            }}
          />
          <ScaleSelect
            label="Gray"
            value={profile.gray}
            options={GRAYS}
            onChange={(value) => {
              set('gray', value as GrayColor)
            }}
          />
          <ScaleSelect
            label="Roundness"
            value={profile.roundness}
            options={['sharp', 'default', 'rounded']}
            onChange={(value) => {
              set('roundness', value as Roundness)
            }}
          />
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '8',
              alignSelf: 'flex-end',
              paddingBlock: '8',
              color: 'fg.muted',
              fontSize: 'sm',
              fontWeight: 'medium',
            })}
          >
            <Switch
              aria-label="Vibrant accent"
              checked={profile.vibrant}
              onCheckedChange={(checked) => {
                set('vibrant', checked)
              }}
            />
            Vibrant
          </div>
        </ControlGroup>

        <ControlGroup title="Status tones">
          {(['success', 'warning', 'danger', 'info', 'highlight'] as const).map((tone) => (
            <ScaleSelect
              key={tone}
              label={`${tone[0]?.toUpperCase() ?? ''}${tone.slice(1)}`}
              value={profile[tone]}
              options={ACCENTS}
              onChange={(value) => {
                set(tone, value as AccentColor)
              }}
            />
          ))}
        </ControlGroup>

        <ControlGroup title="Data-viz ramps">
          <ScaleSelect
            label="Sequential"
            value={profile.sequential}
            options={RAMP_SCALES}
            onChange={(value) => {
              set('sequential', value as AccentColor | GrayColor)
            }}
          />
          <ScaleSelect
            label="Diverging (low)"
            value={profile.divergingNeg}
            options={ACCENTS}
            onChange={(value) => {
              set('divergingNeg', value as AccentColor)
            }}
          />
          <ScaleSelect
            label="Diverging (high)"
            value={profile.divergingPos}
            options={ACCENTS}
            onChange={(value) => {
              set('divergingPos', value as AccentColor)
            }}
          />
        </ControlGroup>

        <div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setProfile(DEFAULTS)
            }}
          >
            Reset to defaults
          </Button>
        </div>
      </div>

      <div
        className={css({
          display: 'grid',
          gap: '20',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        })}
      >
        <PreviewSurface vars={lightVars} label="Light" />
        <PreviewSurface vars={darkVars} label="Dark" />
      </div>

      <CodeBlock
        title="panda.config.ts"
        code={configSnippet}
        copied={copied === 'config'}
        onCopy={() => {
          copy(configSnippet, 'config')
        }}
      />
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '8' })}>
        <CodeBlock
          title="theme profile (JSON)"
          code={jsonProfile}
          copied={copied === 'profile'}
          onCopy={() => {
            copy(jsonProfile, 'profile')
          }}
        />
        <p className={css({ fontSize: 'xs', color: 'fg.muted' })}>
          The JSON profile is a portable, CLI-installable description of the theme; the config above
          is the ready-to-paste PandaCSS output it expands to.
        </p>
      </div>
    </section>
  )
}
