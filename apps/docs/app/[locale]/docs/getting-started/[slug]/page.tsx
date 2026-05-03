import { notFound } from 'next/navigation'

import { getGettingStartedPage, gettingStartedPages, locales } from '../../../../../lib/docs'

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
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </main>
  )
}
