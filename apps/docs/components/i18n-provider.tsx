'use client'

import { StalkI18nProvider } from '@stalk-ui/i18n'
import { en } from '@stalk-ui/i18n/locales/en'

import type { ReactNode } from 'react'

interface DocsI18nProviderProps {
  children?: ReactNode
}

export function DocsI18nProvider({ children }: DocsI18nProviderProps) {
  return (
    <StalkI18nProvider locale="en" messages={en}>
      {children}
    </StalkI18nProvider>
  )
}
