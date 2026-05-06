import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { format, resolveConfig } from 'prettier'
import { rimrafSync } from 'rimraf'

import {
  DEFAULT_VARIANT,
  registryIndexSchema,
  registryItemSchema,
  schemaVersion,
  VARIANTS,
  variantManifestSegment,
} from '../registry/schema'
import { registryItems } from '../registry/ui'

import type {
  NonDefaultVariant,
  RegistryFile,
  RegistryIndex,
  RegistryItem,
  Variant,
} from '../registry/schema'
import type { RegistrySource } from '../registry/ui/_template'

const rootDirectory = process.cwd()
const publicDirectory = join(rootDirectory, 'public')
const registryDirectory = join(publicDirectory, 'r')
const shadcnDirectory = join(registryDirectory, 'shadcn')
const generatedAt = process.env.STALK_REGISTRY_GENERATED_AT ?? '1970-01-01T00:00:00.000Z'

const stableJson = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex')
const shadcnCompatibilityHeader =
  '// Stalk UI component - requires PandaCSS setup and @stalk-ui/preset.'

// Components that import from `@radix-ui/*` or use a React state/effect/ref/
// context hook must render on the client. The directive is injected only into
// registry-served output so internal Storybook/vitest/tsup builds (which read
// source) stay free of bundler warnings about module-level directives.
const clientHookPattern =
  /\b(useState|useEffect|useLayoutEffect|useRef|useImperativeHandle|useReducer|useCallback|useMemo|useContext|useId|useTransition|useDeferredValue|useSyncExternalStore|createContext)\b/
const sourceNeedsUseClient = (source: string): boolean =>
  source.includes("from '@radix-ui/") || clientHookPattern.test(source)
const useClientDirective = "'use client'\n\n"

const writeJson = async (path: string, value: unknown) => {
  mkdirSync(dirname(path), { recursive: true })
  // Resolve the repo's .prettierrc config explicitly. `format()` does not load
  // it from `filepath` alone, which would let printWidth drift between this
  // script and the lint-staged hook and reintroduce registry JSON drift.
  const resolved = (await resolveConfig(path)) ?? {}
  const content = await format(stableJson(value), { ...resolved, filepath: path, parser: 'json' })
  writeFileSync(path, content)
  return content
}

const inlineFile = (file: RegistryFile, sourcePath: string): RegistryFile => {
  const raw = readFileSync(join(rootDirectory, sourcePath), 'utf8')
  const content = sourceNeedsUseClient(raw) ? `${useClientDirective}${raw}` : raw
  const { sourcePath: _sourcePath, ...serializableFile } = file

  return {
    ...serializableFile,
    content,
  }
}

const sourceForVariant = (item: RegistrySource, variant: Variant): string | undefined => {
  if (variant === DEFAULT_VARIANT) {
    return item.files[0]?.sourcePath
  }
  return item.variantSources?.[variant as NonDefaultVariant]
}

const toSerializableItem = (item: RegistrySource, variant: Variant): RegistryItem | undefined => {
  const sourcePath = sourceForVariant(item, variant)
  if (sourcePath === undefined) {
    return undefined
  }

  // Strip the in-memory-only `variantSources` field before zod parsing so the
  // serialized JSON stays a single-variant `RegistryItem`.
  const { variantSources: _variantSources, ...rest } = item
  const parsed = registryItemSchema.parse(rest)

  return {
    ...parsed,
    files: parsed.files.map((file) => inlineFile(file, sourcePath)),
  }
}

const withShadcnCompatibilityHeader = (content: string) => {
  // Anchor the header to the first import statement so it survives the shadcn
  // CLI's import-rewriting pass. Comments inside the directive prologue (above
  // the imports) are stripped when the CLI re-emits the file; comments adjacent
  // to imports are preserved.
  const importMatch = /^import [^\n]*\n/m.exec(content)

  if (importMatch === null) {
    return `${shadcnCompatibilityHeader}\n${content}`
  }

  const insertionPoint = importMatch.index + importMatch[0].length
  return `${content.slice(0, insertionPoint)}${shadcnCompatibilityHeader}\n${content.slice(
    insertionPoint,
  )}`
}

const toShadcnItem = (item: RegistryItem): RegistryItem => ({
  ...item,
  files: item.files.map((file) => ({
    ...file,
    content: file.content === undefined ? undefined : withShadcnCompatibilityHeader(file.content),
  })),
})

rimrafSync(registryDirectory)
mkdirSync(shadcnDirectory, { recursive: true })

const manifests: RegistryIndex['manifests'] = {}

for (const item of registryItems) {
  for (const variant of VARIANTS) {
    const nativeItem = toSerializableItem(item, variant)
    if (nativeItem === undefined) {
      continue
    }
    const shadcnItem = registryItemSchema.parse(toShadcnItem(nativeItem))
    const segment = variantManifestSegment(variant, nativeItem.name)
    const nativePath = join(registryDirectory, segment)
    const shadcnPath = join(shadcnDirectory, segment)
    const nativeContent = await writeJson(nativePath, nativeItem)
    const shadcnContent = await writeJson(shadcnPath, shadcnItem)

    const nativeKey =
      variant === DEFAULT_VARIANT ? nativeItem.name : `${variant}/${nativeItem.name}`
    const shadcnKey =
      variant === DEFAULT_VARIANT
        ? `shadcn/${nativeItem.name}`
        : `shadcn/${variant}/${nativeItem.name}`

    manifests[nativeKey] = {
      path: `/r/${segment}`,
      sha256: sha256(nativeContent),
    }
    manifests[shadcnKey] = {
      path: `/r/shadcn/${segment}`,
      sha256: sha256(shadcnContent),
    }
  }
}

const index = registryIndexSchema.parse({
  schemaVersion,
  generatedAt,
  manifests,
})

await writeJson(join(registryDirectory, 'integrity.json'), index)

writeFileSync(
  join(publicDirectory, '_headers'),
  `/r/*.json
  Cache-Control: public, max-age=300, stale-while-revalidate=86400
  X-Stalk-Schema-Version: ${schemaVersion}

/r/shadcn/*.json
  Cache-Control: public, max-age=300, stale-while-revalidate=86400
`,
)
