'use client'

import { useContext } from 'react'

import { StalkI18nContext } from './provider'

export const useStalkI18n = () => {
  const context = useContext(StalkI18nContext)

  if (context === undefined) {
    throw new Error('useStalkI18n must be used within StalkI18nProvider')
  }

  return context
}
