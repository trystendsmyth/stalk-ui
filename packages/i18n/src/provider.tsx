'use client'

import { createContext, useMemo } from 'react'

import type { MessageDictionary, StalkI18nContextValue, StalkI18nProviderProps } from './types'

const readMessage = (messages: MessageDictionary, key: string): string | undefined => {
  const value = key
    .split('.')
    .reduce<
      MessageDictionary | string | undefined
    >((current, segment) => (typeof current === 'object' ? current[segment] : undefined), messages)

  return typeof value === 'string' ? value : undefined
}

export const StalkI18nContext = createContext<StalkI18nContextValue | undefined>(undefined)

export function StalkI18nProvider({ children, locale, messages }: StalkI18nProviderProps) {
  const value = useMemo<StalkI18nContextValue>(
    () => ({
      locale,
      messages,
      t: (key, fallback) => readMessage(messages, key) ?? fallback ?? key,
    }),
    [locale, messages],
  )

  return <StalkI18nContext.Provider value={value}>{children}</StalkI18nContext.Provider>
}
