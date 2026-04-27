'use client'

import type { ReactNode } from 'react'

interface ComponentPreviewProps {
  children: ReactNode
  code: string
}

export const ComponentPreview = ({ children, code }: ComponentPreviewProps) => (
  <section className="component-preview">
    <div className="component-preview__rendered">{children}</div>
    <details className="component-preview__code">
      <summary>Show code</summary>
      <pre>
        <code>{code}</code>
      </pre>
    </details>
  </section>
)
