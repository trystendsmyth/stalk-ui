// Asserts every locale matches the `en` key-shape and has non-empty,
// non-verbatim translations. Update TARGET_LOCALES when scope changes.

import { ar } from '../packages/i18n/src/locales/ar'
import { en } from '../packages/i18n/src/locales/en'
import { es } from '../packages/i18n/src/locales/es'
import { zhCN } from '../packages/i18n/src/locales/zh-cn'

import type { MessageDictionary } from '../packages/i18n/src/types'

const TARGET_LOCALES: Record<string, MessageDictionary> = {
  ar,
  en,
  es,
  'zh-CN': zhCN,
}

const flatten = (
  dictionary: MessageDictionary,
  prefix = '',
  out: Map<string, string> = new Map(),
): Map<string, string> => {
  for (const [key, value] of Object.entries(dictionary)) {
    const compositeKey = prefix === '' ? key : `${prefix}.${key}`
    if (typeof value === 'string') {
      out.set(compositeKey, value)
    } else {
      flatten(value, compositeKey, out)
    }
  }
  return out
}

const baseline = flatten(en)
const baselineKeys = new Set(baseline.keys())
const failures: string[] = []

for (const [locale, dictionary] of Object.entries(TARGET_LOCALES)) {
  if (locale === 'en') continue

  const flat = flatten(dictionary)
  const keys = new Set(flat.keys())

  for (const key of baselineKeys) {
    if (!keys.has(key)) {
      failures.push(`${locale}: missing key '${key}' (defined in en)`)
    }
  }
  for (const key of keys) {
    if (!baselineKeys.has(key)) {
      failures.push(`${locale}: extra key '${key}' (not defined in en)`)
    }
  }

  for (const [key, value] of flat.entries()) {
    if (typeof value !== 'string') {
      failures.push(`${locale}: key '${key}' must be a string, got ${typeof value}`)
      continue
    }
    if (value.trim() === '') {
      failures.push(`${locale}: key '${key}' is empty — every key must have a translation`)
    }
    if (locale !== 'en' && value === baseline.get(key)) {
      failures.push(
        `${locale}: key '${key}' has the same value as 'en' (likely untranslated): ${JSON.stringify(value)}`,
      )
    }
  }
}

if (failures.length > 0) {
  console.error('i18n coverage check failed:')
  for (const failure of failures) {
    console.error(`  - ${failure}`)
  }
  console.error(
    `\n${String(failures.length)} translation gap${failures.length === 1 ? '' : 's'} across ` +
      `${String(Object.keys(TARGET_LOCALES).length)} target locale${
        Object.keys(TARGET_LOCALES).length === 1 ? '' : 's'
      }.`,
  )
  process.exit(1)
}

console.log(
  `i18n coverage check passed: ${String(baselineKeys.size)} keys × ${String(
    Object.keys(TARGET_LOCALES).length,
  )} locales (en, ar, es, zh-CN).`,
)
