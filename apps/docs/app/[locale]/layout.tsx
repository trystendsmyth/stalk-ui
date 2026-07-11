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
          <a
            aria-label="Stalk UI on GitHub"
            className="nav__icon"
            href="https://github.com/trystendsmyth/stalk-ui"
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
              <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
            </svg>
          </a>
          <a
            aria-label="Stalk UI on npm"
            className="nav__icon"
            href="https://www.npmjs.com/package/@stalk-ui/cli"
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
              <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
            </svg>
          </a>
        </nav>
      </header>
      {children}
    </div>
  )
}
