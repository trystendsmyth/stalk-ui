import {
  createAccentSemanticTokens,
  createSemanticColorTokens,
  createVibrantAccentSemanticTokens,
} from './tokens/semantic-colors'
import { createScaleSemanticTokens } from './tokens/semantic-scales'

import type { ScaleTokenOptions } from './tokens/semantic-scales'
import type { AccentColor, GrayColor, TokenGroup } from './types'
import type { Preset } from '@pandacss/dev'

/** A PandaCSS theme variant — the value you register under `themes`. */
export type StalkTheme = NonNullable<Preset['themes']>[string]

export interface DefineThemeOptions {
  /** Primary accent scale (drives buttons, focus rings, `tone="accent"`, …). */
  accent: AccentColor
  /** Neutral scale for surfaces, text, and borders. Defaults to `slate`. */
  gray?: GrayColor
  /** Use the punchier accent spread (surface/subtle/muted at 3/5/8 vs 2/5/7). */
  vibrant?: boolean
  /** Override the success palette (default: `emerald`). */
  success?: AccentColor
  /** Override the warning palette (default: `yellow`). */
  warning?: AccentColor
  /** Override the danger palette (default: `red`). */
  danger?: AccentColor
  /** Override the info palette (default: `blue`). */
  info?: AccentColor
  /** Override the promotional highlight palette (default: `orange`). */
  highlight?: AccentColor
  /**
   * Font stacks. You must still load the actual font faces (e.g. via `next/font`
   * or `@fontsource`); this only sets the `fonts.sans` / `fonts.mono` tokens.
   */
  fonts?: { mono?: string; sans?: string }
  /**
   * Re-hue the data-viz ramps (`scale.sequential.*`, `scale.diverging.*`).
   * Defaults follow the accent (sequential) and `['red', 'blue']` (diverging).
   * Consumed by the HeatMap primitive and dependency-free Sparklines.
   */
  scales?: ScaleTokenOptions
  /**
   * Extra status-style tone groups beyond the built-ins (accent/success/warning/
   * danger/info/highlight). Each entry generates the full 8-key tone surface from
   * a Radix accent scale, so `colorPalette="<name>"` retints any component to it.
   *
   * @example tones: { brand: 'teal', promo: 'violet' }
   *
   * Note: to use a custom tone as a *dynamic* (runtime) `colorPalette` value, add
   * its name to your config `staticCss.css[].properties.colorPalette`; static
   * usages in source are extracted automatically.
   */
  tones?: Record<string, AccentColor>
  /**
   * Extra raw token scales merged into the theme — e.g. `radii`, `fontSizes`,
   * `lineHeights`, `spacing`, `sizes`. These re-scale density, corners, and the
   * type scale for everything rendered under the theme.
   */
  tokens?: TokenGroup
  /** Additional semantic color tokens merged over the generated set. */
  semanticTokens?: { colors?: TokenGroup }
}

/**
 * Build a complete Stalk UI theme (a PandaCSS theme variant) from a concise set
 * of options, so consumers don't have to hand-author the full semantic color
 * surface (bg / fg / border / accent / status / highlight).
 *
 * Register the result under `themes` in your `panda.config.ts` and apply it with
 * `data-panda-theme`. Remember to also add the theme name to `staticCss.themes`
 * so its CSS is generated.
 *
 * @example
 * export default defineConfig({
 *   presets: ['@stalk-ui/preset'],
 *   themes: {
 *     brand: defineTheme({
 *       accent: 'violet',
 *       gray: 'mauve',
 *       fonts: { sans: '"Geist", var(--font-sans, ui-sans-serif, system-ui)' },
 *       tokens: { radii: { lg: { value: '1rem' } } },
 *     }),
 *   },
 *   staticCss: { themes: ['brand'] },
 * })
 */
export const defineTheme = (options: DefineThemeOptions): StalkTheme => {
  const { accent, gray = 'slate', vibrant = false, fonts, tokens: extraTokens } = options

  const base = createSemanticColorTokens(accent, gray)

  // Custom tones → full 8-key tone surfaces keyed by name.
  const toneColors: TokenGroup = {}
  for (const [name, scale] of Object.entries(options.tones ?? {})) {
    toneColors[name] = createAccentSemanticTokens(scale)
  }

  const colors: TokenGroup = {
    ...base,
    accent: vibrant
      ? createVibrantAccentSemanticTokens(accent)
      : createAccentSemanticTokens(accent),
    ...(options.success ? { success: createAccentSemanticTokens(options.success) } : {}),
    ...(options.warning ? { warning: createAccentSemanticTokens(options.warning) } : {}),
    ...(options.danger ? { danger: createAccentSemanticTokens(options.danger) } : {}),
    ...(options.info ? { info: createAccentSemanticTokens(options.info) } : {}),
    ...(options.highlight ? { highlight: createAccentSemanticTokens(options.highlight) } : {}),
    // Re-hue the viz ramps; sequential defaults to the theme accent.
    ...createScaleSemanticTokens({
      sequential: options.scales?.sequential ?? accent,
      diverging: options.scales?.diverging ?? ['red', 'blue'],
      gray: options.scales?.gray ?? gray,
    }),
    ...toneColors,
    ...(options.semanticTokens?.colors ?? {}),
  }

  const fontTokens: TokenGroup = {}
  if (fonts?.sans) fontTokens.sans = { value: fonts.sans }
  if (fonts?.mono) fontTokens.mono = { value: fonts.mono }

  const tokens: TokenGroup = {
    ...(extraTokens ?? {}),
    ...(Object.keys(fontTokens).length > 0 ? { fonts: fontTokens } : {}),
  }

  const theme = { semanticTokens: { colors } }
  return Object.keys(tokens).length > 0 ? { ...theme, tokens } : theme
}
