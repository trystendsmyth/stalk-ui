import {
  Noto_Sans,
  Noto_Sans_Arabic,
  Noto_Sans_Devanagari,
  Noto_Sans_Hebrew,
  Noto_Sans_HK,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Sans_Thai,
} from 'next/font/google'

import type { CSSProperties } from 'react'

/**
 * Script-specific Noto families for locale-driven loading.
 * Extend this map when new docs locales ship.
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

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic', 'latin', 'latin-ext'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-arabic',
})

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew', 'latin', 'latin-ext'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-hebrew',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-jp',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-kr',
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-sc',
})

const notoSansHK = Noto_Sans_HK({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-hk',
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-tc',
})

const notoSansThai = Noto_Sans_Thai({
  subsets: ['latin', 'latin-ext', 'thai'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-thai',
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin', 'latin-ext'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-devanagari',
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

export function getFontStackForLocale(locale: string): FontStackForLocale {
  const scriptMap = LOCALE_FONT_SCRIPTS as Record<string, FontScript>
  const script = scriptMap[locale] ?? 'latin'

  if (script === 'latin') {
    return { variableClassNames: '' }
  }

  switch (script) {
    case 'arabic':
      return {
        variableClassNames: notoSansArabic.variable,
        sansStackStyle: {
          ['--font-sans' as string]: sansCssStack('--font-noto-arabic', '--font-noto-base'),
        },
      }
    case 'hebrew':
      return {
        variableClassNames: notoSansHebrew.variable,
        sansStackStyle: {
          ['--font-sans' as string]: sansCssStack('--font-noto-hebrew', '--font-noto-base'),
        },
      }
    case 'japanese':
      return {
        variableClassNames: notoSansJP.variable,
        sansStackStyle: {
          ['--font-sans' as string]: sansCssStack('--font-noto-jp', '--font-noto-base'),
        },
      }
    case 'korean':
      return {
        variableClassNames: notoSansKR.variable,
        sansStackStyle: {
          ['--font-sans' as string]: sansCssStack('--font-noto-kr', '--font-noto-base'),
        },
      }
    case 'simplifiedChinese':
      return {
        variableClassNames: notoSansSC.variable,
        sansStackStyle: {
          ['--font-sans' as string]: sansCssStack('--font-noto-sc', '--font-noto-base'),
        },
      }
    case 'traditionalChineseHk':
      return {
        variableClassNames: notoSansHK.variable,
        sansStackStyle: {
          ['--font-sans' as string]: sansCssStack('--font-noto-hk', '--font-noto-base'),
        },
      }
    case 'traditionalChineseTw':
      return {
        variableClassNames: notoSansTC.variable,
        sansStackStyle: {
          ['--font-sans' as string]: sansCssStack('--font-noto-tc', '--font-noto-base'),
        },
      }
    case 'thai':
      return {
        variableClassNames: notoSansThai.variable,
        sansStackStyle: {
          ['--font-sans' as string]: sansCssStack('--font-noto-thai', '--font-noto-base'),
        },
      }
    case 'devanagari':
      return {
        variableClassNames: notoSansDevanagari.variable,
        sansStackStyle: {
          ['--font-sans' as string]: sansCssStack('--font-noto-devanagari', '--font-noto-base'),
        },
      }
    default:
      return { variableClassNames: '' }
  }
}
