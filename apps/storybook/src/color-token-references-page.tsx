import { useMemo, useSyncExternalStore } from 'react'
import { token, type Token } from 'styled-system/tokens'

import { semanticTokens } from '../../../packages/preset/src/semantic-tokens'
import { monochromeTheme } from '../../../packages/preset/src/themes/monochrome'
import { rainbowTheme } from '../../../packages/preset/src/themes/rainbow'

type SemanticColorNode = Record<string, unknown>

interface SemanticColorRow {
  tokenPath: string
  base: string
  dark: string
}

const isSemanticLeaf = (node: unknown): node is { value: { base: string; _dark: string } } => {
  if (typeof node !== 'object' || node === null) return false
  if (!('value' in node)) return false
  const inner: unknown = Reflect.get(node, 'value')
  if (typeof inner !== 'object' || inner === null) return false
  if (!('base' in inner) || !('_dark' in inner)) return false
  const leaf = inner as Record<string, unknown>
  return typeof leaf.base === 'string' && typeof leaf._dark === 'string'
}

const flattenSemanticColorRows = (node: unknown, path: string[] = []): SemanticColorRow[] => {
  if (isSemanticLeaf(node)) {
    const normalizedPath = path.filter((segment) => segment !== 'DEFAULT')
    return [
      {
        tokenPath: `colors.${normalizedPath.join('.')}`,
        base: node.value.base,
        dark: node.value._dark,
      },
    ]
  }

  if (!node || typeof node !== 'object') {
    return []
  }

  return Object.entries(node as SemanticColorNode).flatMap(([key, value]) =>
    flattenSemanticColorRows(value, [...path, key]),
  )
}

type ThemeId = 'neutral' | 'rainbow' | 'monochrome'

const parseThemeId = (value: string | null): ThemeId => {
  if (value === 'rainbow' || value === 'monochrome') return value
  return 'neutral'
}

const mergeThemeSemanticColors = (theme: ThemeId): typeof semanticTokens.colors => {
  const base = semanticTokens.colors
  if (theme === 'rainbow') {
    return { ...base, ...rainbowTheme.semanticTokens.colors }
  }
  if (theme === 'monochrome') {
    return { ...base, ...monochromeTheme.semanticTokens.colors }
  }
  return base
}

const getSemanticRows = (rows: SemanticColorRow[], ...prefixes: string[]) =>
  rows.filter((row) => prefixes.some((prefix) => row.tokenPath.startsWith(prefix)))

const orderRows = (rows: SemanticColorRow[], order: string[]): SemanticColorRow[] =>
  rows
    .map((row, index) => ({ index, rank: order.indexOf(row.tokenPath), row }))
    .sort((a, b) => {
      if (a.rank === -1 && b.rank === -1) return a.index - b.index
      if (a.rank === -1) return 1
      if (b.rank === -1) return -1
      return a.rank - b.rank
    })
    .map(({ row }) => row)

const buildSections = (colorsRoot: typeof semanticTokens.colors) => {
  const semanticColorRows = flattenSemanticColorRows(colorsRoot)
  return [
    [
      'Background',
      orderRows(getSemanticRows(semanticColorRows, 'colors.bg.'), [
        'colors.bg.canvas',
        'colors.bg.default',
        'colors.bg.subtle',
        'colors.bg.muted',
      ]),
    ],
    [
      'Foreground',
      orderRows(getSemanticRows(semanticColorRows, 'colors.fg.'), [
        'colors.fg.default',
        'colors.fg.muted',
        'colors.fg.subtle',
        'colors.fg.inverse',
      ]),
    ],
    [
      'Border',
      orderRows(getSemanticRows(semanticColorRows, 'colors.border.'), [
        'colors.border.muted',
        'colors.border.default',
        'colors.border.strong',
      ]),
    ],
    ['Accent', getSemanticRows(semanticColorRows, 'colors.accent.')],
    ['Success', getSemanticRows(semanticColorRows, 'colors.success.')],
    ['Warning', getSemanticRows(semanticColorRows, 'colors.warning.')],
    ['Danger', getSemanticRows(semanticColorRows, 'colors.danger.')],
    ['Info', getSemanticRows(semanticColorRows, 'colors.info.')],
  ] as const
}

const renderColorReferenceTable = (rows: SemanticColorRow[]) => (
  <table className="color-reference-table">
    <thead>
      <tr>
        <th scope="col">Token</th>
        <th scope="col">Preview</th>
        <th scope="col">Base</th>
        <th scope="col">_dark</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.tokenPath}>
          <td>
            <code className="color-reference-table__token" title={row.tokenPath}>
              {row.tokenPath}
            </code>
          </td>
          <td className="color-reference-table__preview">
            <span
              className="color-reference-preview"
              style={{ backgroundColor: token(row.tokenPath as Token) }}
            />
          </td>
          <td>
            <code className="color-reference-table__ref">{row.base}</code>
          </td>
          <td>
            <code className="color-reference-table__ref">{row.dark}</code>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

const subscribePreviewGlobals = (onStoreChange: () => void) => {
  if (typeof document === 'undefined') {
    return () => {
      /* SSR / docgen — no document to observe */
    }
  }
  const el = document.documentElement
  const observer = new MutationObserver(onStoreChange)
  observer.observe(el, {
    attributes: true,
    attributeFilter: ['data-panda-theme', 'data-color-mode', 'class'],
  })
  return () => {
    observer.disconnect()
  }
}

const getPreviewGlobalsSignature = () => {
  if (typeof document === 'undefined') {
    return 'neutral|light'
  }
  const html = document.documentElement
  const panda = html.getAttribute('data-panda-theme') ?? 'neutral'
  const mode = html.classList.contains('dark') ? 'dark' : 'light'
  return `${panda}|${mode}`
}

const getServerSnapshot = (): string => {
  return 'neutral|light'
}

export const ColorTokenReferencesPage = () => {
  const globalsSignature = useSyncExternalStore(
    subscribePreviewGlobals,
    getPreviewGlobalsSignature,
    getServerSnapshot,
  )

  const themeId = useMemo(
    () => parseThemeId(globalsSignature.split('|')[0] ?? null),
    [globalsSignature],
  )

  const sections = useMemo(() => {
    const merged = mergeThemeSemanticColors(themeId)
    return buildSections(merged)
  }, [themeId])

  return (
    <>
      <style>{`
  .color-reference-page {
    display: grid;
    gap: 2rem;
  }

  .color-reference-section {
    display: grid;
    gap: 0.75rem;
  }

  .color-reference-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-block-start: 0.5rem;
  }

  .color-reference-heading h2 {
    margin: 0;
    padding: 0;
  }

  .color-reference-count {
    color: currentColor;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    opacity: 0.6;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .color-reference-table {
    border: 1px solid ${token('colors.border.muted')};
    border-radius: 10px;
    border-collapse: separate;
    border-spacing: 0;
    color: inherit;
    font-size: 14px;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
  }

  .color-reference-table th,
  .color-reference-table td {
    border-bottom: 1px solid ${token('colors.border.muted')};
    border-inline-end: 1px solid ${token('colors.border.muted')};
    padding: 0.75rem;
    text-align: left;
    vertical-align: middle;
  }

  .color-reference-table th:last-child,
  .color-reference-table td:last-child {
    border-inline-end: 0;
  }

  .color-reference-table th {
    background: color-mix(in srgb, currentColor 6%, transparent);
    border-bottom-color: ${token('colors.border.default')};
    color: currentColor;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    opacity: 0.72;
    position: sticky;
    text-transform: uppercase;
    top: 0;
    z-index: 1;
  }

  .color-reference-table tbody tr:nth-child(even) {
    background: color-mix(in srgb, currentColor 3%, transparent);
  }

  .color-reference-table tbody tr:hover {
    background: color-mix(in srgb, currentColor 6%, transparent);
  }

  .color-reference-table tbody tr:last-child td {
    border-bottom: 0;
  }

  .color-reference-table th:nth-child(1),
  .color-reference-table td:nth-child(1) {
    width: 30%;
  }

  .color-reference-table th:nth-child(2),
  .color-reference-table td:nth-child(2) {
    width: 16%;
  }

  .color-reference-table th:nth-child(3),
  .color-reference-table th:nth-child(4),
  .color-reference-table td:nth-child(3),
  .color-reference-table td:nth-child(4) {
    width: 27%;
  }

  .color-reference-table code {
    background: color-mix(in srgb, currentColor 7%, transparent);
    border-radius: 4px;
    font-size: 0.75rem;
    padding: 2px 6px;
  }

  .color-reference-table__token {
    background: transparent !important;
    display: block;
    max-width: 100%;
    overflow: hidden;
    padding: 0 !important;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .color-reference-table__preview {
    vertical-align: middle;
  }

  .color-reference-preview {
    border: 1px solid ${token('colors.border.default')};
    border-radius: 8px;
    box-shadow: inset 0 0 0 1px ${token('colors.border.muted')};
    display: block;
    height: 2rem;
    max-width: 8rem;
    min-width: 5rem;
    width: 100%;
  }

  .color-reference-table__ref {
    display: block;
    line-height: 1.45;
    overflow-wrap: anywhere;
    width: 100%;
    word-break: break-word;
  }
`}</style>

      <div className="sb-container color-reference-page">
        <div className="sb-section-title">
          <h1>Color token references</h1>

          <p>
            Semantic color definitions from <code>@stalk-ui/preset</code>, merged with the active
            Storybook <strong>pandaTheme</strong> toolbar value (neutral, rainbow, or monochrome).
            Each row lists the token path, a live preview using Panda <code>token()</code>, and the
            primitive references for light (<code>base</code>) and dark (<code>_dark</code>) mode
            for that theme.
          </p>

          <p>
            Changing <strong>mode</strong> (light/dark) updates CSS variables on the document root;
            the preview column and table chrome follow the toolbar. Changing{' '}
            <strong>pandaTheme</strong> updates the <strong>Base</strong> / <strong>_dark</strong>{' '}
            reference columns to match the selected theme overrides.
          </p>
        </div>

        <div className="sb-section">
          {sections.map(([label, rows]) => (
            <section className="color-reference-section" key={label}>
              <div className="color-reference-heading">
                <h2>{label}</h2>
                <span className="color-reference-count">{rows.length} tokens</span>
              </div>
              {renderColorReferenceTable(rows)}
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
