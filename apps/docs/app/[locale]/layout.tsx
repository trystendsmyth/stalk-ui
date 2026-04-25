import { notFound } from 'next/navigation'

import { isLocale, locales } from '../../lib/docs'

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

  return (
    <div className="docs-shell">
      <header className="site-header">
        <a className="brand" href={`/${locale}`}>
          Stalk UI
        </a>
        <nav aria-label="Primary navigation">
          <a href={`/${locale}/docs`}>Docs</a>
          <a href={`/${locale}/components`}>Components</a>
          <a href="https://stalk-ui.com/r/">Registry</a>
          <a href="https://trystendsmyth.github.io/stalk-ui">Storybook</a>
        </nav>
      </header>
      {children}
    </div>
  )
}
