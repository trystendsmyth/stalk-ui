import { Noto_Sans } from 'next/font/google'

import type { CSSProperties } from 'react'

/**
 * Script-specific Noto families for locale-driven loading.
 *
 * Only the families for *shipped* locales are instantiated below — each
 * `Noto_Sans_*()` call triggers a build-time download, and eagerly fetching
 * families for locales that don't ship makes those downloads fail (the heavy
 * CJK/complex-script fonts in particular). Webpack degrades to a fallback font,
 * but Turbopack treats the failed fetch as a hard build error. Since `locales`
 * currently ships only `en` (latin), we load just `Noto_Sans`.
 *
 * When a non-latin locale ships, add its loader and a matching case in
 * `getFontStackForLocale` — e.g.
 *   `import { Noto_Sans_Arabic } from 'next/font/google'`
 *   `const notoSansArabic = Noto_Sans_Arabic({ subsets: ['arabic', 'latin'], ... })`
 * so only the glyphs that locale needs are downloaded.
 */
export type FontScript =
  | 'latin'
  | 'arabic'
  | 'hebrew'
  | 'japanese'
  | 'korean'
  | 'simplifiedChinese'
  | 'traditionalChineseHk'
  | 'traditionalChineseTw'
  | 'thai'
  | 'devanagari'

export const LOCALE_FONT_SCRIPTS = {
  en: 'latin',
  ar: 'arabic',
  he: 'hebrew',
  ja: 'japanese',
  ko: 'korean',
  zh: 'simplifiedChinese',
  'zh-CN': 'simplifiedChinese',
  'zh-Hans': 'simplifiedChinese',
  'zh-TW': 'traditionalChineseTw',
  'zh-Hant': 'traditionalChineseTw',
  'zh-HK': 'traditionalChineseHk',
  hi: 'devanagari',
  th: 'thai',
} as const satisfies Record<string, FontScript>

const FONT_FALLBACK_STACK = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'

const sansCssStack = (...cssVarNames: string[]) =>
  [...cssVarNames.map((name) => `var(${name})`), FONT_FALLBACK_STACK].join(', ')

export const notoSansBase = Noto_Sans({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-base',
})

export interface FontStackForLocale {
  /** Extra `next/font` variable classes (omit when empty). */
  variableClassNames: string
  /** When set, overrides inherited `--font-sans` for this subtree. */
  sansStackStyle?: CSSProperties
}

export const rootSansStackStyle: CSSProperties = {
  ['--font-sans' as string]: sansCssStack('--font-noto-base'),
}

export function getFontStackForLocale(_locale: string): FontStackForLocale {
  // Only latin (Noto_Sans, applied at the root) ships today, so every locale
  // inherits the base stack. Re-add a per-script branch here alongside its
  // loader when a non-latin locale ships.
  return { variableClassNames: '' }
}
