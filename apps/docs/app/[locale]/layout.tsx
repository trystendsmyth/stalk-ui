import { notFound } from 'next/navigation'

import { isLocale, locales } from '../../lib/docs'
import { getFontStackForLocale } from '../../lib/fonts'

import type { ReactNode } from 'react'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const { variableClassNames, sansStackStyle } = getFontStackForLocale(locale)
  const shellClassName = ['docs-shell', variableClassNames].filter(Boolean).join(' ')

  return (
    <div className={shellClassName} style={sansStackStyle}>
      <header className="site-header">
        <a className="brand" href={`/${locale}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- vector logo, optimization is moot */}
          <img alt="" aria-hidden="true" className="brand__mark" src="/stalk-ui-logo.svg" />
          <span>Stalk UI</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href={`/${locale}/docs`}>Docs</a>
          <a href={`/${locale}/components`}>Components</a>
          <a href="/r/integrity.json">Registry</a>
          <a href="https://trystendsmyth.github.io/stalk-ui">Storybook</a>
        </nav>
      </header>
      {children}
    </div>
  )
}
