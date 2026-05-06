import { z } from 'zod'

import { DEFAULT_VARIANT } from '../constants'
import { CliError } from '../errors'
import { fetchManifest, resolveManifestUrl } from '../manifest'

import type { RegistryItem, StalkConfig, Variant } from '../types'

const integrityIndexSchema = z.object({
  schemaVersion: z.literal('1.0'),
  generatedAt: z.string(),
  manifests: z.record(
    z.string(),
    z.object({
      path: z.string(),
      sha256: z.string(),
    }),
  ),
})

export type IntegrityIndex = z.infer<typeof integrityIndexSchema>

export interface RegistryListing {
  name: string
  registry: string
  variant: Variant
  flavor: 'stalk' | 'shadcn'
  manifestPath: string
}

const indexUrlForRegistry = (template: string): string => {
  // Templates are `<root>/r/{name}.json` (or similar). Replace `{name}` with
  // `integrity` to reach the index. Non-templated registry overrides cannot
  // be enumerated, so we surface that as a CliError.
  if (!template.includes('{name}')) {
    throw new CliError(`Registry "${template}" is not enumerable (no {name} placeholder).`)
  }
  return template.replace('{name}', 'integrity')
}

const fetchIntegrityIndex = async (url: string, verbose = false): Promise<IntegrityIndex> => {
  if (verbose) {
    console.log(`Fetching ${url}`)
  }
  const response = await fetch(url)

  if (!response.ok) {
    throw new CliError(`Failed to fetch index ${url}: HTTP ${String(response.status)}`)
  }

  return integrityIndexSchema.parse(await response.json())
}

const classifyManifestKey = (
  key: string,
): { name: string; variant: Variant; flavor: 'stalk' | 'shadcn' } => {
  // Keys follow `[<variant>/]?[shadcn/]?<name>` based on
  // `variantManifestSegment` + the shadcn-flavor mirror at `r/shadcn/`.
  const segments = key.split('/')
  const name = segments.pop() ?? key
  let variant: Variant = DEFAULT_VARIANT
  let flavor: 'stalk' | 'shadcn' = 'stalk'

  for (const segment of segments) {
    if (segment === 'shadcn') {
      flavor = 'shadcn'
    } else if (segment === 'base' || segment === 'radix') {
      variant = segment
    }
  }

  return { name, variant, flavor }
}

export interface ListItemsOptions {
  registries: string[]
  config: StalkConfig
  variant?: Variant | undefined
  flavor?: 'stalk' | 'shadcn' | undefined
  verbose?: boolean | undefined
}

export const listAllItems = async ({
  registries,
  config,
  variant,
  flavor,
  verbose,
}: ListItemsOptions): Promise<RegistryListing[]> => {
  const targetVariant = variant ?? config.primitives ?? DEFAULT_VARIANT
  const targetFlavor = flavor ?? 'stalk'
  const results: RegistryListing[] = []

  for (const registry of registries) {
    const template = config.registries[registry]

    if (template === undefined) {
      throw new CliError(`No registry configured for namespace ${registry}.`)
    }

    const index = await fetchIntegrityIndex(indexUrlForRegistry(template), verbose)

    for (const [key, entry] of Object.entries(index.manifests)) {
      const { name, variant: itemVariant, flavor: itemFlavor } = classifyManifestKey(key)

      if (itemVariant !== targetVariant || itemFlavor !== targetFlavor) {
        continue
      }

      results.push({
        name,
        registry,
        variant: itemVariant,
        flavor: itemFlavor,
        manifestPath: entry.path,
      })
    }
  }

  return results.sort((a, b) => a.name.localeCompare(b.name))
}

const fuzzyScore = (haystack: string, needle: string): number => {
  if (needle.length === 0) return 1
  const target = haystack.toLowerCase()
  const query = needle.toLowerCase()

  if (target === query) return 1000
  if (target.startsWith(query)) return 100
  if (target.includes(query)) return 50

  let queryIndex = 0
  for (const char of target) {
    if (char === query[queryIndex]) queryIndex += 1
    if (queryIndex === query.length) return 1
  }
  return 0
}

export const searchItems = (items: RegistryListing[], query: string): RegistryListing[] =>
  items
    .map((item) => ({ item, score: fuzzyScore(item.name, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)

export interface ViewItemOptions {
  config: StalkConfig
  registryOverride?: string
  verbose?: boolean
}

export const viewItem = async (
  prefixedName: string,
  { config, registryOverride, verbose }: ViewItemOptions,
): Promise<RegistryItem> => {
  const url = resolveManifestUrl(prefixedName, config, registryOverride)
  return fetchManifest(url, verbose)
}
