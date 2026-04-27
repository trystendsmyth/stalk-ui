'use client'

import { useState } from 'react'

import type { ReactNode } from 'react'

interface ComponentPreviewProps {
  children: ReactNode
  code: string
}

export const ComponentPreview = ({ children, code }: ComponentPreviewProps) => {
  const [showCode, setShowCode] = useState(false)
  const [theme, setTheme] = useState<'neutral' | 'rainbow'>('neutral')

  return (
    <section className="component-preview">
      <div className="component-preview__toolbar">
        <label>
          Theme
          <select
            value={theme}
            aria-label="Theme"
            onChange={(event) => {
              setTheme(event.target.value as 'neutral' | 'rainbow')
            }}
          >
            <option value="neutral">Neutral</option>
            <option value="rainbow">Rainbow</option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            setShowCode((current) => !current)
          }}
        >
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>
      <div
        className="component-preview__rendered"
        data-panda-theme={theme === 'rainbow' ? 'rainbow' : undefined}
      >
        {children}
      </div>
      {showCode && (
        <pre>
          <code>{code}</code>
        </pre>
      )}
    </section>
  )
}
