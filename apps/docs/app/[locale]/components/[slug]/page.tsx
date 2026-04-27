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
      {component.examples.map((example, index) => (
        <LiveComponentPreview key={example} code={example} example={index} slug={component.slug} />
      ))}

      <h2>Props</h2>
      {component.props.length === 0 ? (
        <p>No component-specific props are documented yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Required</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {component.props.map((prop) => (
              <tr key={prop.name}>
                <td>{prop.name}</td>
                <td>{prop.type}</td>
                <td>{prop.required}</td>
                <td>{prop.defaultValue}</td>
                <td>{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Variants</h2>
      {component.variants.length === 0 ? (
        <p>No recipe variants are documented for this component.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Variant</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            {component.variants.map((variant) => (
              <tr key={variant.name}>
                <td>{variant.name}</td>
                <td>{variant.values}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Registry</h2>
      <ul className="article-list">
        {component.registry.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </main>
  )
}
