// @vitest-environment jsdom
import { render, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StalkI18nProvider } from './provider'
import { useStalkTranslation } from './translation'

import type { ReactNode } from 'react'

describe('useStalkTranslation', () => {
  it('returns the bundled en fallback when no provider is mounted', () => {
    const { result } = renderHook(() => useStalkTranslation())

    expect(result.current.locale).toBe('en')
    expect(result.current.t('dialog.close')).toBe('Close')
    expect(result.current.t('dialog.closeDialog')).toBe('Close dialog')
  })

  it('prefers provider messages over the bundled fallback', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <StalkI18nProvider locale="fr-FR" messages={{ dialog: { close: 'Fermer' } }}>
        {children}
      </StalkI18nProvider>
    )

    const { result } = renderHook(() => useStalkTranslation(), { wrapper })

    expect(result.current.locale).toBe('fr-FR')
    expect(result.current.t('dialog.close')).toBe('Fermer')
    // Falls through to bundled en for keys the provider does not declare.
    expect(result.current.t('combobox.noResults')).toBe('No results found')
  })

  it('returns the caller fallback for unknown keys, then the key itself', () => {
    const { result } = renderHook(() => useStalkTranslation())

    expect(result.current.t('does.not.exist', 'Custom fallback')).toBe('Custom fallback')
    expect(result.current.t('also.missing')).toBe('also.missing')
  })

  it('renders inside React trees without throwing when no provider is present', () => {
    const Consumer = () => {
      const { t } = useStalkTranslation()
      return <span>{t('dialog.close')}</span>
    }

    const { container } = render(<Consumer />)
    expect(container.textContent).toBe('Close')
  })
})
