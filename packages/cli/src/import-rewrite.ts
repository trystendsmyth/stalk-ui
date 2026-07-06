// Registry file content imports Panda output via the alias declared in the
// manifest (`stalk.importAliases.styledSystem`, canonically `styled-system`).
// Consumers that alias the Panda outdir differently (Panda `importMap`, e.g.
// `@styled`) would otherwise have to hand-rewrite every installed file before
// it compiles — so `add`, `diff`, and `upgrade` rewrite module specifiers to
// the consumer's alias as content crosses the registry boundary.

import { detectPandaImportMap } from './panda-config'

import type { PandaImportMap, PandaImportMapEntries } from './panda-config'
import type { GlobalOptions, StalkConfig } from './types'

const DEFAULT_STYLED_SYSTEM_ALIAS = 'styled-system'

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const importMapKeys = ['css', 'jsx', 'patterns', 'recipes'] as const

// An object-form importMap whose entries all share `<prefix>/<key>` shapes
// collapses to that prefix, which lets unknown subpaths (and `init` writing
// `styledSystem` to stalk.config.json) reuse it.
export const importMapCommonPrefix = (entries: PandaImportMapEntries): string | undefined => {
  const prefixes = importMapKeys.map((key) => {
    const value = entries[key]
    return value.endsWith(`/${key}`) ? value.slice(0, -(key.length + 1)) : undefined
  })
  const [first] = prefixes
  return first !== undefined && prefixes.every((prefix) => prefix === first) ? first : undefined
}

/** String form of an importMap for stalk.config.json, when one exists. */
export const styledSystemAliasFor = (importMap: PandaImportMap): string | undefined =>
  typeof importMap === 'string' ? importMap : importMapCommonPrefix(importMap)

/**
 * The consumer's effective styled-system alias: an explicit non-default
 * `styledSystem` in stalk.config.json wins, then the Panda `importMap`,
 * then the canonical default.
 */
export const resolveStyledSystemTarget = async (
  root: string,
  config: StalkConfig,
  options: GlobalOptions,
): Promise<PandaImportMap> => {
  if (config.styledSystem !== DEFAULT_STYLED_SYSTEM_ALIAS) {
    return config.styledSystem
  }

  return (await detectPandaImportMap(root, options)) ?? config.styledSystem
}

const rewriteSpecifier = (
  sourceAlias: string,
  target: PandaImportMap,
  subpath: string | undefined,
): string => {
  if (typeof target === 'string') {
    return subpath === undefined ? target : `${target}/${subpath}`
  }

  if (subpath !== undefined) {
    const [head, ...rest] = subpath.split('/')
    const entry = importMapKeys.find((key) => key === head)

    if (entry !== undefined) {
      return [target[entry], ...rest].join('/')
    }
  }

  const prefix = importMapCommonPrefix(target)

  if (prefix === undefined) {
    // No mapping for this specifier; leave it for the consumer to resolve.
    return subpath === undefined ? sourceAlias : `${sourceAlias}/${subpath}`
  }

  return subpath === undefined ? prefix : `${prefix}/${subpath}`
}

/**
 * Build a content transform that rewrites `sourceAlias` module specifiers to
 * the consumer's target. Matches static `from '…'` clauses, bare side-effect
 * imports, and dynamic `import('…')`.
 */
export const createImportRewriter = (
  sourceAlias: string,
  target: PandaImportMap,
): ((content: string) => string) => {
  if (target === sourceAlias) {
    return (content) => content
  }

  const specifierPattern = new RegExp(
    `((?:from|import)\\s*\\(?\\s*)(['"])${escapeRegExp(sourceAlias)}(/[^'"]*)?\\2`,
    'g',
  )

  return (content) =>
    content.replace(
      specifierPattern,
      (_match, lead: string, quote: string, subpath: string | undefined) =>
        `${lead}${quote}${rewriteSpecifier(sourceAlias, target, subpath?.slice(1))}${quote}`,
    )
}
