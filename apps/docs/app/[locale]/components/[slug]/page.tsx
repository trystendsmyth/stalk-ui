import { notFound } from 'next/navigation'

import { LiveComponentPreview } from '../../../../components/live-component-preview'
import { getComponentDoc, getComponentDocs, locales } from '../../../../lib/docs'

interface ComponentPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export const generateStaticParams = () =>
  locales.flatMap((locale) =>
    getComponentDocs().map((component) => ({ locale, slug: component.slug })),
  )

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params
  const component = getComponentDoc(slug)

  if (component === undefined) {
    notFound()
  }

  return (
    <main className="article">
      <p className="eyebrow">Component</p>
      <h1>{component.title}</h1>
      <p className="lede">{component.description}</p>

      <h2>Install</h2>
      <pre>
        <code>{component.installCommand}</code>
      </pre>

      <h2>Examples</h2>
      <LiveComponentPreview slug={component.slug} />
      {component.examples.map((example) => (
        <pre key={example}>
          <code>{example}</code>
        </pre>
      ))}

      <h2>Registry</h2>
      <ul className="article-list">
        {component.registry.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </main>
  )
}
