import type { ReactNode } from 'react'

export type MessageValue = string | MessageDictionary

export interface MessageDictionary {
  [key: string]: MessageValue
}

export interface StalkI18nContextValue {
  locale: string
  messages: MessageDictionary
  t: (key: string, fallback?: string) => string
}

export interface StalkI18nProviderProps {
  children: ReactNode
  locale: string
  messages: MessageDictionary
}
