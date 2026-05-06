import { z } from 'zod'

import { DEFAULT_VARIANT, supportedSchemaVersion } from './constants'
import { CliError } from './errors'

import type { RegistryItem, StalkConfig } from './types'

// `{name}`-templated registries follow the convention `<root>/r/{name}.json`,
// where the default variant lives at `<root>/r/<name>.json` and non-default
// variants at `<root>/r/<variant>/<name>.json`. We expand variant routing by
// rewriting the substituted name segment, so non-templated overrides are
// passed through unchanged.
const variantSegment = (config: StalkConfig): string => {
  const variant = config.primitives ?? DEFAULT_VARIANT
  return variant === DEFAULT_VARIANT ? '' : `${variant}/`
}

const registryFileSchema = z.object({
  path: z.string().min(1),
  type: z.enum(['registry:ui', 'registry:lib', 'registry:hook']),
  content: z.string(),
})

const registryItemSchema = z.object({
  $schema: z.url(),
  name: z.string().min(1),
  type: z.enum(['registry:ui', 'registry:lib', 'registry:hook']),
  dependencies: z.array(z.string()),
  registryDependencies: z.array(z.string()),
  files: z.array(registryFileSchema),
  stalk: z.object({
    schemaVersion: z.literal(supportedSchemaVersion),
    preset: z.object({
      semanticTokens: z.record(z.string(), z.unknown()),
      recipes: z.array(z.string()),
    }),
    packageDependencies: z.object({
      preset: z.literal('@stalk-ui/preset'),
      i18n: z.literal('@stalk-ui/i18n').optional(),
    }),
    pandaCodegen: z.boolean(),
    importAliases: z.object({
      styledSystem: z.string(),
    }),
  }),
})

const withTimeout = async (url: string, timeoutMs: number) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => {
    controller.abort()
  }, timeoutMs)

  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

const sleep = async (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

export const resolveManifestUrl = (
  name: string,
  config: StalkConfig,
  registryOverride?: string,
) => {
  const segment = variantSegment(config)

  if (registryOverride !== undefined) {
    return registryOverride.includes('{name}')
      ? registryOverride.replace('{name}', `${segment}${name.replace(/^@[^/]+\//, '')}`)
      : registryOverride
  }

  const [namespace, componentName] = name.startsWith('@')
    ? (name.split('/') as [string, string])
    : ['@stalk-ui', name]
  const template = config.registries[namespace]

  if (template === undefined) {
    throw new CliError(`No registry configured for namespace ${namespace}.`)
  }

  return template.replace('{name}', `${segment}${componentName}`)
}

export const fetchManifest = async (url: string, verbose = false): Promise<RegistryItem> => {
  const timeoutMs = Number(process.env.STALK_UI_REQUEST_TIMEOUT_MS ?? '10000')
  const delays = [250, 1000, 4000]
  let lastError: unknown

  for (let attempt = 0; attempt < delays.length + 1; attempt += 1) {
    try {
      if (verbose) {
        console.log(`Fetching ${url}`)
      }

      const response = await withTimeout(url, timeoutMs)

      if (!response.ok) {
        if (response.status >= 500 && attempt < delays.length) {
          await sleep(delays[attempt] ?? 0)
          continue
        }

        throw new CliError(`Failed to fetch ${url}: HTTP ${String(response.status)}`)
      }

      return registryItemSchema.parse(await response.json())
    } catch (error) {
      lastError = error

      if (attempt < delays.length) {
        await sleep(delays[attempt] ?? 0)
        continue
      }
    }
  }

  if (lastError instanceof z.ZodError) {
    throw new CliError(`Manifest validation failed for ${url}: ${lastError.message}`)
  }

  if (lastError instanceof Error) {
    throw new CliError(`Failed to fetch ${url}: ${lastError.message}`)
  }

  throw new CliError(`Failed to fetch ${url}`)
}
