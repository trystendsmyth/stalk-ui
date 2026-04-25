import { gettingStartedPages } from '../../../lib/docs'

interface DocsIndexPageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function DocsIndexPage({ params }: DocsIndexPageProps) {
  const { locale } = await params

  return (
    <main className="content-grid">
      <section className="page-heading">
        <p className="eyebrow">Documentation</p>
        <h1>Build with Stalk UI</h1>
        <p className="lede">Installation, theming, registry, and component usage guides.</p>
      </section>
      <div className="card-grid">
        {gettingStartedPages.map((page) => (
          <a
            className="doc-card"
            href={`/${locale}/docs/getting-started/${page.slug}`}
            key={page.slug}
          >
            <span>{page.title}</span>
            <p>{page.description}</p>
          </a>
        ))}
      </div>
    </main>
  )
}
