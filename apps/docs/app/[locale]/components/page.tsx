import { getComponentDocs } from '../../../lib/docs'

interface ComponentsIndexPageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function ComponentsIndexPage({ params }: ComponentsIndexPageProps) {
  const { locale } = await params
  const components = getComponentDocs()

  return (
    <main className="content-grid">
      <section className="page-heading">
        <p className="eyebrow">Components</p>
        <h1>Component docs</h1>
        <p className="lede">
          Generated API and registry documentation for each Stalk UI component.
        </p>
      </section>
      <div className="card-grid">
        {components.map((component) => (
          <a
            className="doc-card"
            href={`/${locale}/components/${component.slug}`}
            key={component.slug}
          >
            <span>{component.title}</span>
            <p>{component.description}</p>
          </a>
        ))}
      </div>
    </main>
  )
}
