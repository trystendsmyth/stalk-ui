'use client'

import { Badge } from '@stalk-ui/components/badge'
import { Button } from '@stalk-ui/components/button'
import { Card } from '@stalk-ui/components/card'
import { Sparkline } from '@stalk-ui/components/sparkline'
import { Switch } from '@stalk-ui/components/switch'
import { defineTheme } from '@stalk-ui/preset/theme'
import { useMemo, useState } from 'react'
import { css } from 'styled-system/css'

import type { AccentColor, DefineThemeOptions, GrayColor } from '@stalk-ui/preset/theme'
import type { CSSProperties } from 'react'

// The full set of Radix scales `defineTheme` accepts. Keeping these in sync with
// the preset's `AccentColor` / `GrayColor` unions is enforced by the type cast below.
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

type Roundness = 'sharp' | 'default' | 'rounded'

const RADII: Record<Roundness, Record<string, string> | undefined> = {
  sharp: { sm: '0', md: '0', lg: '0', xl: '2px' },
  default: undefined,
  rounded: { sm: '8px', md: '12px', lg: '16px', xl: '22px' },
}

/** A `{ accent, gray, … }` theme profile — the portable shape a CLI install would consume. */
interface ThemeProfile {
  accent: AccentColor
  gray: GrayColor
  vibrant: boolean
  roundness: Roundness
  success: AccentColor
  warning: AccentColor
  danger: AccentColor
}

const DEFAULTS: ThemeProfile = {
  accent: 'teal',
  gray: 'slate',
  vibrant: false,
  roundness: 'default',
  success: 'emerald',
  warning: 'amber',
  danger: 'red',
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

const controlClass = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '6',
  fontSize: 'sm',
  fontWeight: 'medium',
})

const selectClass = css({
  width: 'auto',
  border: '1px solid var(--colors-border-default, #ccc)',
  borderRadius: '8px',
  paddingBlock: '8',
  // Extra inline-end room so the native chevron sits just past the value, not the edge.
  paddingInlineStart: '12',
  paddingInlineEnd: '10',
  background: 'var(--colors-bg-default, #fff)',
  color: 'inherit',
  font: 'inherit',
  cursor: 'pointer',
})

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
        <Badge>Default</Badge>
        <Badge tone="success" variant="solid">
          Live
        </Badge>
        <Badge tone="warning">Pending</Badge>
        <Badge tone="danger" variant="outline">
          Error
        </Badge>
        <Switch defaultChecked aria-label="Setting" />
        <Sparkline data={trend} area showLastPoint aria-label="Trend" />
      </div>
      <Card.Root>
        <Card.Header>
          <Card.Title>Card title</Card.Title>
          <Card.Description>Surfaces, borders, and accents all retheme live.</Card.Description>
        </Card.Header>
      </Card.Root>
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
    <section className={css({ display: 'flex', flexDirection: 'column', gap: '24', mt: '32' })}>
      <div
        className={css({ display: 'flex', flexWrap: 'wrap', gap: '20', alignItems: 'flex-end' })}
      >
        <label className={controlClass}>
          Accent
          <select
            className={selectClass}
            value={profile.accent}
            onChange={(event) => {
              set('accent', event.target.value as AccentColor)
            }}
          >
            {ACCENTS.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </select>
        </label>
        <label className={controlClass}>
          Gray
          <select
            className={selectClass}
            value={profile.gray}
            onChange={(event) => {
              set('gray', event.target.value as GrayColor)
            }}
          >
            {GRAYS.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </select>
        </label>
        <label className={controlClass}>
          Roundness
          <select
            className={selectClass}
            value={profile.roundness}
            onChange={(event) => {
              set('roundness', event.target.value as Roundness)
            }}
          >
            <option value="sharp">sharp</option>
            <option value="default">default</option>
            <option value="rounded">rounded</option>
          </select>
        </label>
        {(['success', 'warning', 'danger'] as const).map((tone) => (
          <label key={tone} className={controlClass}>
            {tone[0]?.toUpperCase()}
            {tone.slice(1)}
            <select
              className={selectClass}
              value={profile[tone]}
              onChange={(event) => {
                set(tone, event.target.value as AccentColor)
              }}
            >
              {ACCENTS.map((scale) => (
                <option key={scale} value={scale}>
                  {scale}
                </option>
              ))}
            </select>
          </label>
        ))}
        <label
          className={css({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8',
            fontSize: 'sm',
            fontWeight: 'medium',
            alignSelf: 'flex-end',
            paddingBlock: '8',
          })}
        >
          <input
            type="checkbox"
            checked={profile.vibrant}
            onChange={(event) => {
              set('vibrant', event.target.checked)
            }}
          />
          Vibrant
        </label>
        <button
          type="button"
          className={selectClass}
          onClick={() => {
            setProfile(DEFAULTS)
          }}
          style={{ alignSelf: 'flex-end', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>

      <div
        className={css({
          display: 'grid',
          gap: '20',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        })}
      >
        <PreviewSurface vars={lightVars} label="Light" />
        <PreviewSurface vars={darkVars} label="Dark" />
      </div>

      <div className={css({ display: 'flex', flexDirection: 'column', gap: '10' })}>
        <div className={css({ display: 'flex', alignItems: 'center', gap: '12' })}>
          <strong className={css({ fontSize: 'sm' })}>panda.config.ts</strong>
          <button
            type="button"
            className={selectClass}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              copy(configSnippet, 'config')
            }}
          >
            {copied === 'config' ? 'Copied' : 'Copy config'}
          </button>
        </div>
        <pre
          className={css({
            overflowX: 'auto',
            borderRadius: '8px',
            padding: '18',
            fontSize: 'xs',
            lineHeight: '1.6',
            background: 'var(--colors-bg-subtle, #f5f5f5)',
            border: '1px solid var(--colors-border-muted, #eee)',
          })}
        >
          <code>{configSnippet}</code>
        </pre>
      </div>

      <div className={css({ display: 'flex', flexDirection: 'column', gap: '10' })}>
        <div className={css({ display: 'flex', alignItems: 'center', gap: '12' })}>
          <strong className={css({ fontSize: 'sm' })}>theme profile (JSON)</strong>
          <button
            type="button"
            className={selectClass}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              copy(jsonProfile, 'profile')
            }}
          >
            {copied === 'profile' ? 'Copied' : 'Copy profile'}
          </button>
        </div>
        <pre
          className={css({
            overflowX: 'auto',
            borderRadius: '8px',
            padding: '18',
            fontSize: 'xs',
            lineHeight: '1.6',
            background: 'var(--colors-bg-subtle, #f5f5f5)',
            border: '1px solid var(--colors-border-muted, #eee)',
          })}
        >
          <code>{jsonProfile}</code>
        </pre>
        <p className={css({ fontSize: 'xs', opacity: 0.7 })}>
          The JSON profile is a portable, CLI-installable description of the theme; the config above
          is the ready-to-paste PandaCSS output it expands to.
        </p>
      </div>
    </section>
  )
}
