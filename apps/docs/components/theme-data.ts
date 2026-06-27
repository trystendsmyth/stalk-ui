import * as radixColors from '@radix-ui/colors'

// ── Color palette catalog ─────────────────────────────────────────────────
// Built-in scales ship in @stalk-ui/preset and use the typed `defineTheme`
// shorthand. Extended scales come from @radix-ui/colors and are emitted on pick
// into the consumer's own config — so they cost nothing to anyone who doesn't
// choose them (the preset stays lean).

const radix = radixColors as unknown as Record<string, Record<string, string>>

export interface ScaleData {
  name: string
  builtin: boolean
  /** 12 light hex steps (extended scales only; built-ins resolve via the preset's vars). */
  light?: string[]
  dark?: string[]
}

const steps = (scale: Record<string, string>, name: string): string[] =>
  Array.from({ length: 12 }, (_, i) => scale[`${name}${String(i + 1)}`] ?? '#000')

const builtin = (name: string): ScaleData => ({ name, builtin: true })
const extended = (name: string): ScaleData => ({
  name,
  builtin: false,
  light: steps(radix[name] ?? {}, name),
  dark: steps(radix[`${name}Dark`] ?? {}, name),
})

/** Scales offered for the status tones, grouped by hue. */
export const TONE_GROUPS: { hue: string; scales: ScaleData[] }[] = [
  {
    hue: 'Reds',
    scales: [builtin('red'), extended('tomato'), extended('ruby'), extended('crimson')],
  },
  {
    hue: 'Pinks & purples',
    scales: [
      builtin('violet'),
      extended('pink'),
      extended('plum'),
      extended('purple'),
      extended('iris'),
    ],
  },
  {
    hue: 'Blues',
    scales: [builtin('blue'), extended('indigo'), extended('sky'), extended('cyan')],
  },
  {
    hue: 'Greens',
    scales: [
      builtin('emerald'),
      builtin('teal'),
      extended('grass'),
      extended('green'),
      extended('jade'),
      extended('mint'),
    ],
  },
  {
    hue: 'Yellows & oranges',
    scales: [
      builtin('amber'),
      builtin('yellow'),
      builtin('orange'),
      extended('lime'),
      extended('gold'),
      extended('bronze'),
    ],
  },
]

export const TONE_SCALES: ScaleData[] = TONE_GROUPS.flatMap((group) => group.scales)
export const SCALE_BY_NAME = new Map(TONE_SCALES.map((scale) => [scale.name, scale]))
export const isExtended = (name: string): boolean => SCALE_BY_NAME.get(name)?.builtin === false

/** CSS-var overrides that make an extended scale resolvable inside a preview surface. */
export const extendedScaleVars = (names: string[]): Record<string, string> => {
  const vars: Record<string, string> = {}
  for (const name of names) {
    const scale = SCALE_BY_NAME.get(name)
    if (!scale || scale.builtin || !scale.light || !scale.dark) continue
    scale.light.forEach((hex, i) => {
      vars[`--colors-${name}-${String(i + 1)}`] = hex
    })
    scale.dark.forEach((hex, i) => {
      vars[`--colors-${name}-dark-${String(i + 1)}`] = hex
    })
  }
  return vars
}

/** Prefix every non-empty line with spaces. */
export const emitBlock = (lines: string[], indent = 0): string[] => {
  const pad = ' '.repeat(indent)
  return lines.map((line) => (line ? pad + line : line))
}

/** Serialize an extended scale to a nicely formatted `tokens.colors` block. */
export const rawScaleTokens = (name: string): string[] => {
  const scale = SCALE_BY_NAME.get(name)
  if (!scale || scale.builtin || !scale.light || !scale.dark) return []

  const emitScale = (scaleName: string, values: string[]): string[] => [
    `${scaleName}: {`,
    ...values.map((hex, i) => `  '${String(i + 1)}': { value: '${hex}' },`),
    `},`,
  ]

  return [...emitScale(name, scale.light), '', ...emitScale(`${name}Dark`, scale.dark)]
}

// ── Fonts (lazy-loaded from Google Fonts on selection) ─────────────────────

export interface FontOption {
  label: string
  /** Token stack written into `fonts.sans`. */
  stack: string
  /** Google Fonts `family` query param; omitted for the system default. */
  google?: string
}

const FALLBACK = 'var(--font-sans, ui-sans-serif, system-ui, -apple-system, sans-serif)'

export const FONTS: FontOption[] = [
  { label: 'System (default)', stack: FALLBACK },
  { label: 'Inter', stack: `'Inter', ${FALLBACK}`, google: 'Inter:wght@400;500;600;700' },
  { label: 'Roboto', stack: `'Roboto', ${FALLBACK}`, google: 'Roboto:wght@400;500;700' },
  { label: 'Poppins', stack: `'Poppins', ${FALLBACK}`, google: 'Poppins:wght@400;500;600;700' },
  {
    label: 'Source Sans 3',
    stack: `'Source Sans 3', ${FALLBACK}`,
    google: 'Source+Sans+3:wght@400;500;600;700',
  },
  {
    label: 'IBM Plex Sans',
    stack: `'IBM Plex Sans', ${FALLBACK}`,
    google: 'IBM+Plex+Sans:wght@400;500;600;700',
  },
  {
    label: 'Space Grotesk',
    stack: `'Space Grotesk', ${FALLBACK}`,
    google: 'Space+Grotesk:wght@400;500;600;700',
  },
  { label: 'Lora (serif)', stack: `'Lora', Georgia, serif`, google: 'Lora:wght@400;500;600;700' },
]

export const FONT_BY_LABEL = new Map(FONTS.map((font) => [font.label, font]))

const loaded = new Set<string>()

/** Inject the Google Fonts stylesheet for a family the first time it's chosen. */
export const loadGoogleFont = (google: string | undefined): void => {
  if (!google || loaded.has(google) || typeof document === 'undefined') return
  loaded.add(google)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${google}&display=swap`
  document.head.append(link)
}

// ── Token presets (radii + elevation) ──────────────────────────────────────

export type Roundness = 'sharp' | 'default' | 'rounded'

export const RADII: Record<Roundness, Record<string, string> | undefined> = {
  sharp: { sm: '0', md: '0', lg: '0', xl: '2px' },
  default: undefined,
  rounded: { sm: '8px', md: '12px', lg: '16px', xl: '22px' },
}

export type Elevation = 'flat' | 'soft' | 'deep'

export const SHADOWS: Record<Elevation, Record<string, string> | undefined> = {
  flat: { sm: 'none', md: '0 1px 2px 0 rgba(0,0,0,0.06)', lg: '0 1px 3px 0 rgba(0,0,0,0.08)' },
  soft: undefined,
  deep: {
    sm: '0 2px 6px -1px rgba(0,0,0,0.16)',
    md: '0 12px 28px -8px rgba(0,0,0,0.30), 0 4px 10px -4px rgba(0,0,0,0.20)',
    lg: '0 24px 48px -12px rgba(0,0,0,0.38)',
  },
}
