'use client'

import { useContext } from 'react'

import { en } from './locales/en'
import { StalkI18nContext } from './provider'

import type { MessageDictionary } from './types'

const readMessage = (messages: MessageDictionary, key: string): string | undefined => {
  const value = key
    .split('.')
    .reduce<
      MessageDictionary | string | undefined
    >((current, segment) => (typeof current === 'object' ? current[segment] : undefined), messages)

  return typeof value === 'string' ? value : undefined
}

/**
 * Resolve a localized string with a built-in `en` fallback.
 *
 * Unlike `useStalkI18n`, this hook does not require `<StalkI18nProvider>` to
 * be mounted. When no provider is present it falls back to the bundled `en`
 * dictionary, so component copies can call `t()` without forcing a hard
 * dependency on the i18n provider on the consumer's tree.
 *
 * Resolution order:
 *   1. provider messages
 *   2. bundled `en` dictionary
 *   3. caller-supplied fallback
 *   4. the key itself
 */
export const useStalkTranslation = () => {
  const context = useContext(StalkI18nContext)

  return {
    locale: context?.locale ?? 'en',
    t: (key: string, fallback?: string): string =>
      (context ? readMessage(context.messages, key) : undefined) ??
      readMessage(en, key) ??
      fallback ??
      key,
  }
}
