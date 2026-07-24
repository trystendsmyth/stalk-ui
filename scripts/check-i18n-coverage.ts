// Asserts every locale matches the `en` key-shape and has non-empty,
// non-verbatim translations. Locales are discovered from src/locales so a new
// locale is covered the moment its file lands.

import { readdirSync } from 'node:fs'
import { join } from 'node:path'

import type { MessageDictionary } from '../packages/i18n/src/types'

const localesDirectory = join('packages/i18n/src/locales')

const localeFiles = readdirSync(localesDirectory)
  .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'))
  .map((file) => file.replace('.ts', ''))
  .sort()

const TARGET_LOCALES: Record<string, MessageDictionary> = {}
for (const locale of localeFiles) {
  const module = (await import(`../packages/i18n/src/locales/${locale}`)) as Record<
    string,
    MessageDictionary
  >
  const dictionaries = Object.values(module)
  const dictionary = dictionaries[0]
  if (dictionaries.length !== 1 || dictionary === undefined) {
    throw new Error(`Expected exactly one dictionary export in locales/${locale}.ts`)
  }
  TARGET_LOCALES[locale] = dictionary
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

const enDictionary = TARGET_LOCALES.en
if (enDictionary === undefined) {
  throw new Error('locales/en.ts is the baseline and must exist')
}
const baseline = flatten(enDictionary)
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
    if (value === baseline.get(key)) {
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
  )} locales (${localeFiles.join(', ')}).`,
)
