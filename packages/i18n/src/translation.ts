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
 * Resolve a localized string. Falls back to the bundled `en` dictionary when
 * `<StalkI18nProvider>` is not mounted, so component copies can call `t()`
 * without requiring the provider in the consumer's tree.
 *
 * Resolution: provider → bundled `en` → caller fallback → key.
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
