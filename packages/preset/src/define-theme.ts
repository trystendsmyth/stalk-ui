import {
  createAccentSemanticTokens,
  createSemanticColorTokens,
  createVibrantAccentSemanticTokens,
} from './tokens/semantic-colors'

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
