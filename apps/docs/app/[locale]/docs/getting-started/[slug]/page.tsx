import { notFound } from 'next/navigation'

import { GettingStartedInteractive } from '../../../../../components/getting-started-interactive'
import { ThemeBuilder } from '../../../../../components/theme-builder'
import { getGettingStartedPage, gettingStartedPages, locales } from '../../../../../lib/docs'

import type { ReactNode } from 'react'

/** Minimal inline markup for body copy: `**bold**` → <strong>, `` `code` `` → <code>. */
function renderRichText(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${String(index)}:${part}`}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={`${String(index)}:${part}`}>{part.slice(1, -1)}</code>
    }
    return part
  })
}

interface GettingStartedPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export const generateStaticParams = () =>
  locales.flatMap((locale) => gettingStartedPages.map((page) => ({ locale, slug: page.slug })))

export default async function GettingStartedPage({ params }: GettingStartedPageProps) {
  const { slug } = await params
  const page = getGettingStartedPage(slug)

  if (page === undefined) {
    notFound()
  }

  return (
    <main className="article">
      <header className="page-heading">
        <p className="eyebrow">Getting started</p>
        <h1>{page.title}</h1>
        <p className="lede">{page.description}</p>
      </header>
      <section className="docs-section">
        <header className="docs-section__header">
          <h2 className="docs-section__title">Overview</h2>
        </header>
        {page.body.map((paragraph) => (
          <p key={paragraph}>{renderRichText(paragraph)}</p>
        ))}
      </section>
      <GettingStartedInteractive slug={slug} />
      {slug === 'customization' ? (
        <section className="docs-section">
          <header className="docs-section__header">
            <h2 className="docs-section__title">Theme builder</h2>
          </header>
          <p>
            Pick scales below to design a completely custom theme. The preview rethemes live in both
            color modes; copy the generated <code>defineTheme</code> config straight into{' '}
            <code>panda.config.ts</code>, or the portable JSON profile.
          </p>
          <ThemeBuilder />
        </section>
      ) : null}
    </main>
  )
}
