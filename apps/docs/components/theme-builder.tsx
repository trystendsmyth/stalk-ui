'use client'

import { Badge } from '@stalk-ui/components/badge'
import { Button } from '@stalk-ui/components/button'
import { Card } from '@stalk-ui/components/card'
import { Select } from '@stalk-ui/components/select'
import { Sparkline } from '@stalk-ui/components/sparkline'
import { Switch } from '@stalk-ui/components/switch'
import { createAccentSemanticTokens, defineTheme } from '@stalk-ui/preset/theme'
import { useId, useMemo, useState } from 'react'
import { css } from 'styled-system/css'

import {
  emitBlock,
  extendedScaleVars,
  FONT_BY_LABEL,
  FONTS,
  isExtended,
  loadGoogleFont,
  RADII,
  rawScaleTokens,
  SHADOWS,
  TONE_GROUPS,
} from './theme-data'

import type { Elevation, Roundness } from './theme-data'
import type { AccentColor, DefineThemeOptions, GrayColor } from '@stalk-ui/preset/theme'
import type { CSSProperties, ReactNode } from 'react'

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
const RAMP_SCALES: string[] = [...ACCENTS, ...GRAYS]
const TONE_KEYS = ['success', 'warning', 'danger', 'info', 'highlight'] as const
type ToneKey = (typeof TONE_KEYS)[number]

interface ThemeProfile {
  accent: AccentColor
  gray: GrayColor
  vibrant: boolean
  roundness: Roundness
  elevation: Elevation
  font: string
  success: string
  warning: string
  danger: string
  info: string
  highlight: string
  sequential: string
  divergingNeg: AccentColor
  divergingPos: AccentColor
}

const DEFAULTS: ThemeProfile = {
  accent: 'teal',
  gray: 'slate',
  vibrant: false,
  roundness: 'default',
  elevation: 'soft',
  font: 'System (default)',
  success: 'emerald',
  warning: 'amber',
  danger: 'red',
  info: 'blue',
  highlight: 'orange',
  sequential: 'teal',
  divergingNeg: 'red',
  divergingPos: 'blue',
}

const TONE_DEFAULTS: Record<ToneKey, string> = {
  success: 'emerald',
  warning: 'amber',
  danger: 'red',
  info: 'blue',
  highlight: 'orange',
}

const tokenRefToVar = (ref: string): string =>
  ref.replace(/\{colors\.([A-Za-z]+)\.(\d+)\}/g, (_match, scale: string, step: string) => {
    const dark = scale.endsWith('Dark')
    const base = dark ? scale.slice(0, -4) : scale
    return `var(--colors-${base}${dark ? '-dark' : ''}-${step})`
  })

const isLeaf = (node: unknown): node is { value: { base: string; _dark: string } } =>
  typeof node === 'object' && node !== null && 'value' in node

const flattenColors = (
  colors: Record<string, unknown>,
): { light: Record<string, string>; dark: Record<string, string> } => {
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

const extendedTones = (profile: ThemeProfile): ToneKey[] =>
  TONE_KEYS.filter((tone) => isExtended(profile[tone]))

/** `defineTheme` options covering everything except extended (custom-scale) tones. */
const toDefineThemeOptions = (profile: ThemeProfile): DefineThemeOptions => {
  const radii = RADII[profile.roundness]
  const shadows = SHADOWS[profile.elevation]
  const font = FONT_BY_LABEL.get(profile.font)
  const tokens: Record<string, unknown> = {}
  if (radii)
    tokens.radii = Object.fromEntries(Object.entries(radii).map(([k, v]) => [k, { value: v }]))
  if (shadows)
    tokens.shadows = Object.fromEntries(Object.entries(shadows).map(([k, v]) => [k, { value: v }]))

  const toneOption = (tone: ToneKey) =>
    isExtended(profile[tone]) || profile[tone] === TONE_DEFAULTS[tone]
      ? {}
      : { [tone]: profile[tone] as AccentColor }

  return {
    accent: profile.accent,
    gray: profile.gray,
    ...(profile.vibrant ? { vibrant: true } : {}),
    ...toneOption('success'),
    ...toneOption('warning'),
    ...toneOption('danger'),
    ...toneOption('info'),
    ...toneOption('highlight'),
    ...(scalesChanged(profile)
      ? {
          scales: {
            sequential: profile.sequential as AccentColor,
            diverging: [profile.divergingNeg, profile.divergingPos],
          },
        }
      : {}),
    ...(font?.google ? { fonts: { sans: font.stack } } : {}),
    ...(Object.keys(tokens).length > 0
      ? { tokens: tokens as NonNullable<DefineThemeOptions['tokens']> }
      : {}),
  }
}

/** Live preview vars: full semantic surface + token + extended-scale overrides. */
const swatchVars = (profile: ThemeProfile): { light: CSSProperties; dark: CSSProperties } => {
  const theme = defineTheme(toDefineThemeOptions(profile)) as {
    semanticTokens?: { colors?: Record<string, unknown> }
    tokens?: Record<string, Record<string, { value: string }>>
  }
  const colors: Record<string, unknown> = { ...(theme.semanticTokens?.colors ?? {}) }
  // Override extended (custom-scale) tones the typed API can't express.
  for (const tone of extendedTones(profile)) {
    colors[tone] = createAccentSemanticTokens(profile[tone] as AccentColor)
  }
  const { light, dark } = flattenColors(colors)

  const tokenVars: Record<string, string> = extendedScaleVars(
    extendedTones(profile).map((t) => profile[t]),
  )
  for (const group of ['radii', 'shadows'] as const) {
    for (const [k, v] of Object.entries(theme.tokens?.[group] ?? {}))
      tokenVars[`--${group}-${k}`] = v.value
  }
  const font = FONT_BY_LABEL.get(profile.font)
  // Override the `sans` token so components (which resolve `fontFamily: 'sans'`)
  // pick up the choice, not just loose text.
  if (font) tokenVars['--fonts-sans'] = font.stack

  return {
    light: { ...light, ...tokenVars, fontFamily: 'var(--fonts-sans)' },
    dark: { ...dark, ...tokenVars, fontFamily: 'var(--fonts-sans)' },
  }
}

// ── Config emit ────────────────────────────────────────────────────────────

const serializeTone = (name: string): string[] => {
  const tone = createAccentSemanticTokens(name as AccentColor) as Record<
    string,
    { value: { base: string; _dark: string } }
  >

  return [
    `{`,
    ...Object.entries(tone).flatMap(([key, value]) => [
      `  ${key}: {`,
      `    value: {`,
      `      base: '${value.value.base}',`,
      `      _dark: '${value.value._dark}',`,
      `    },`,
      `  },`,
    ]),
    `}`,
  ]
}

const toConfigSnippet = (profile: ThemeProfile): string => {
  const ext = extendedTones(profile)
  const dt: string[] = [`  accent: '${profile.accent}',`, `  gray: '${profile.gray}',`]
  if (profile.vibrant) dt.push(`  vibrant: true,`)
  for (const tone of TONE_KEYS) {
    if (!isExtended(profile[tone]) && profile[tone] !== TONE_DEFAULTS[tone]) {
      dt.push(`  ${tone}: '${profile[tone]}',`)
    }
  }
  if (scalesChanged(profile)) {
    dt.push(
      `  scales: { sequential: '${profile.sequential}', diverging: ['${profile.divergingNeg}', '${profile.divergingPos}'] },`,
    )
  }
  const font = FONT_BY_LABEL.get(profile.font)
  if (font?.google) dt.push(`  fonts: { sans: "${font.stack}" },`)
  const radii = RADII[profile.roundness]
  const shadows = SHADOWS[profile.elevation]
  const tokenParts: string[] = []
  if (radii)
    tokenParts.push(
      `radii: { ${Object.entries(radii)
        .map(([k, v]) => `${k}: { value: '${v}' }`)
        .join(', ')} }`,
    )
  if (shadows)
    tokenParts.push(
      `shadows: { ${Object.entries(shadows)
        .map(([k, v]) => `${k}: { value: '${v}' }`)
        .join(', ')} }`,
    )
  if (tokenParts.length > 0) dt.push(`  tokens: { ${tokenParts.join(', ')} },`)
  if (ext.length > 0) {
    dt.push(`  semanticTokens: {`)
    dt.push(`    colors: {`)

    for (const tone of ext) {
      dt.push(`      ${tone}: {`)
      dt.push(...emitBlock(serializeTone(profile[tone]).slice(1, -1), 8))
      dt.push(`      },`)
    }

    dt.push(`    },`)
    dt.push(`  },`)
  }

  const rawScales = [...new Set(ext.map((tone) => profile[tone]))].flatMap(rawScaleTokens)

  return [
    `import { defineConfig } from '@pandacss/dev'`,
    `import { defineTheme } from '@stalk-ui/preset/theme'`,
    ``,
    `export default defineConfig({`,
    `  preflight: true,`,
    `  presets: ['@stalk-ui/preset'],`,

    ...(rawScales.length
      ? [
          `  // Custom Radix scales used by the tones below:`,
          `  theme: {`,
          `    extend: {`,
          `      tokens: {`,
          `        colors: {`,
          ...emitBlock(rawScales, 10),
          `        },`,
          `      },`,
          `    },`,
          `  },`,
        ]
      : []),

    `  themes: {`,
    `    custom: defineTheme({`,
    ...dt.map((line) => `      ${line}`),
    `    }),`,
    `  },`,
    `  staticCss: { themes: ['custom'] },`,
    `})`,
  ].join('\n')
}

// ── Chrome ───────────────────────────────────────────────────────────────

const labelClass = css({ color: 'fg.muted', fontSize: 'sm', fontWeight: 'medium' })
const controlClass = css({ display: 'flex', flexDirection: 'column', gap: '6' })
const triggerClass = css({ minW: '9rem' })

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
        <Select.Trigger aria-labelledby={id} size="sm" className={triggerClass}>
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

/** Tone picker grouped by hue, with built-in vs custom-scale markers. */
function ToneSelect({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const id = useId()
  return (
    <div className={controlClass}>
      <span id={id} className={labelClass}>
        {label}
      </span>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger aria-labelledby={id} size="sm" className={triggerClass}>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {TONE_GROUPS.map((group) => (
            <Select.Group key={group.hue}>
              <Select.Label>{group.hue}</Select.Label>
              {group.scales.map((scale) => (
                <Select.Item key={scale.name} value={scale.name}>
                  {scale.name}
                  {scale.builtin ? '' : ' (custom)'}
                </Select.Item>
              ))}
            </Select.Group>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  )
}

function ControlGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '14',
        border: '1px solid',
        borderColor: 'border.muted',
        borderRadius: '10px',
        padding: '18',
        margin: '0',
      })}
    >
      <legend
        className={css({
          fontSize: 'xs',
          fontWeight: 'semibold',
          color: 'fg.subtle',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          paddingInline: '6',
        })}
      >
        {title}
      </legend>
      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '18' })}>{children}</div>
    </fieldset>
  )
}

// ── Preview ──────────────────────────────────────────────────────────────

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
    <div
      className={css({
        borderRadius: '12px',
        border: '1px solid var(--colors-border-default)',
        background: 'var(--colors-bg-default)',
        color: 'var(--colors-fg-default)',
        padding: '24',
        display: 'flex',
        flexDirection: 'column',
        gap: '14',
      })}
      style={vars}
    >
      <span className={css({ fontSize: 'xs', opacity: 0.6 })}>{label}</span>
      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '12', alignItems: 'center' })}>
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" tone="danger">
          Delete
        </Button>
      </div>
      <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '12', alignItems: 'center' })}>
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
      <Card.Root variant="elevated">
        <Card.Header>
          <Card.Title>Elevated card</Card.Title>
          <Card.Description>
            Surfaces, accents, radius, shadow, and font all retheme live.
          </Card.Description>
        </Card.Header>
      </Card.Root>
    </div>
  )
}

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
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '10', minWidth: 0 })}>
      <div className={css({ display: 'flex', alignItems: 'center', gap: '12' })}>
        <strong className={css({ fontSize: 'sm' })}>{title}</strong>
        <Button size="sm" variant="outline" onClick={onCopy}>
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre
        className={css({
          overflowX: 'auto',
          maxWidth: '100%',
          minWidth: 0,
          borderRadius: '8px',
          padding: '18',
          fontSize: 'xs',
          lineHeight: '1.6',
          background: 'bg.subtle',
          border: '1px solid',
          borderColor: 'border.muted',
        })}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function ThemeBuilder() {
  const [profile, setProfile] = useState<ThemeProfile>(DEFAULTS)
  const [copied, setCopied] = useState<'config' | 'profile' | null>(null)

  const { light, dark } = useMemo(() => swatchVars(profile), [profile])
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

  return (
    <section className={css({ display: 'flex', flexDirection: 'column', gap: '24', mt: '24' })}>
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '14' })}>
        <ControlGroup title="Core">
          <ScaleSelect
            label="Accent"
            value={profile.accent}
            options={ACCENTS}
            onChange={(v) => {
              set('accent', v as AccentColor)
            }}
          />
          <ScaleSelect
            label="Gray"
            value={profile.gray}
            options={GRAYS}
            onChange={(v) => {
              set('gray', v as GrayColor)
            }}
          />
          <ScaleSelect
            label="Roundness"
            value={profile.roundness}
            options={['sharp', 'default', 'rounded']}
            onChange={(v) => {
              set('roundness', v as Roundness)
            }}
          />
          <ScaleSelect
            label="Elevation"
            value={profile.elevation}
            options={['flat', 'soft', 'deep']}
            onChange={(v) => {
              set('elevation', v as Elevation)
            }}
          />
          <ScaleSelect
            label="Font"
            value={profile.font}
            options={FONTS.map((f) => f.label)}
            onChange={(v) => {
              loadGoogleFont(FONT_BY_LABEL.get(v)?.google)
              set('font', v)
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

        <ControlGroup title="Status tones (any hue)">
          {TONE_KEYS.map((tone) => (
            <ToneSelect
              key={tone}
              label={`${tone[0]?.toUpperCase() ?? ''}${tone.slice(1)}`}
              value={profile[tone]}
              onChange={(v) => {
                set(tone, v)
              }}
            />
          ))}
        </ControlGroup>

        <ControlGroup title="Data-viz ramps">
          <ScaleSelect
            label="Sequential"
            value={profile.sequential}
            options={RAMP_SCALES}
            onChange={(v) => {
              set('sequential', v)
            }}
          />
          <ScaleSelect
            label="Diverging (low)"
            value={profile.divergingNeg}
            options={ACCENTS}
            onChange={(v) => {
              set('divergingNeg', v as AccentColor)
            }}
          />
          <ScaleSelect
            label="Diverging (high)"
            value={profile.divergingPos}
            options={ACCENTS}
            onChange={(v) => {
              set('divergingPos', v as AccentColor)
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
        <PreviewSurface vars={light} label="Light" />
        <PreviewSurface vars={dark} label="Dark" />
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
          Built-in scales use the typed `defineTheme` shorthand; custom-scale tones emit their Radix
          scale into your own config, so the preset stays lean. The JSON profile is the portable,
          CLI-installable description.
        </p>
      </div>
    </section>
  )
}
