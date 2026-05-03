import { notFound } from 'next/navigation'

import { ComponentPreview } from '../../../../components/component-preview'
import { InstallCommand } from '../../../../components/install-command'
import { getComponentDoc, getComponentDocs, locales } from '../../../../lib/docs'

import type { ReactNode } from 'react'

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

interface DocsSectionProps {
  children: ReactNode
  hint?: string
  title: string
}

const DocsSection = ({ children, hint, title }: DocsSectionProps) => (
  <section className="docs-section">
    <header className="docs-section__header">
      <h2 className="docs-section__title">{title}</h2>
      {hint === undefined ? null : <p className="docs-section__hint">{hint}</p>}
    </header>
    {children}
  </section>
)

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params
  const component = getComponentDoc(slug)

  if (component === undefined) {
    notFound()
  }

  return (
    <main className="article">
      <header className="page-heading">
        <p className="eyebrow">Component</p>
        <h1>{component.title}</h1>
        <p className="lede">{component.description}</p>
      </header>

      <DocsSection hint="Run the CLI to copy the source into your project." title="Install">
        <InstallCommand command={component.installCommand} />
      </DocsSection>

      <DocsSection
        hint="Live previews render through the docs app's PandaCSS codegen."
        title="Examples"
      >
        {component.examples.length === 0 ? (
          <p className="docs-section__empty">No examples have been published for this component.</p>
        ) : (
          component.examples.map((example) => <ComponentPreview key={example} code={example} />)
        )}
      </DocsSection>

      <DocsSection
        hint="Public component props extracted from the source TypeScript types."
        title="Props"
      >
        {component.props.length === 0 ? (
          <p className="docs-section__empty">
            No component-specific props are documented yet — the component accepts the underlying
            element&apos;s standard props.
          </p>
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
                  <td>
                    <code>{prop.type}</code>
                  </td>
                  <td>{prop.required}</td>
                  <td>{prop.defaultValue}</td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DocsSection>

      <DocsSection
        hint="Variant axes exposed by the underlying PandaCSS recipe or slot recipe."
        title="Variants"
      >
        {component.variants.length === 0 ? (
          <p className="docs-section__empty">
            No recipe variants are documented for this component.
          </p>
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
                  <td>
                    <code>{variant.values}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DocsSection>

      <DocsSection
        hint="Files this component contributes to your registry install."
        title="Registry"
      >
        <ul className="article-list">
          {component.registry.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </DocsSection>
    </main>
  )
}
