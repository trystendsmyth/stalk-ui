import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, posix } from 'node:path'

import { format, resolveConfig } from 'prettier'
import { rimrafSync } from 'rimraf'

import { registryLibs } from '../registry/lib'
import { COMPONENT_LIBS } from '../registry/lib/component-libs'
import { stalkUtilLibByExport, STALK_UTILS_LIBS } from '../registry/lib/utils-exports'
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
// Third-party UI libraries that are client-only (browser APIs, refs, effects)
// just like Radix. A pure forwardRef wrapper around one of these would not trip
// the hook pattern, so match their bare imports too.
const clientOnlyPackages = [
  'cmdk',
  'react-day-picker',
  'input-otp',
  'react-international-phone',
  'react-qrcode-logo',
  'react-resizable-panels',
  'vaul',
]
export const sourceNeedsUseClient = (source: string): boolean =>
  source.includes("from '@radix-ui/") ||
  // createStyleContext calls React createContext at module scope, which throws
  // inside a Server Component even though the wrapper file has no hooks.
  source.includes('createStyleContext') ||
  clientOnlyPackages.some((pkg) => source.includes(`from '${pkg}'`)) ||
  clientHookPattern.test(source)
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

// Components import shared helpers from the `@stalk-ui/utils` workspace package
// so local dev (Storybook/vitest/tsup) resolves them via node_modules. For the
// copied-in registry output we rewrite that bare specifier to a relative path
// pointing at the lib file the CLI installs alongside the component. Without
// this the installed component would import a package the consumer never gets.
const stalkUtilsImportPattern =
  /import\s+(?<typeKeyword>type\s+)?\{(?<names>[^}]*)\}\s+from\s+['"]@stalk-ui\/utils['"];?/g

const stripExtension = (path: string): string => path.replace(/\.[^/.]+$/, '')

const relativeSpecifier = (fromFilePath: string, toFilePath: string): string => {
  const specifier = posix.relative(posix.dirname(fromFilePath), stripExtension(toFilePath))
  return specifier.startsWith('.') ? specifier : `./${specifier}`
}

const rewriteStalkUtilsImports = (source: string, componentPath: string): string =>
  source.replace(stalkUtilsImportPattern, (match, ...args) => {
    const groups = args.at(-1) as { typeKeyword?: string; names?: string }
    const typeKeyword = groups.typeKeyword ?? ''
    const importedNames = (groups.names ?? '')
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name.length > 0)

    const byLib = new Map<string, { targetPath: string; names: string[] }>()
    for (const importName of importedNames) {
      const localBinding = importName.split(/\s+as\s+/)[0]?.trim() ?? importName
      const lib = stalkUtilLibByExport.get(localBinding)
      if (lib === undefined) {
        throw new Error(
          `build-registry: '${componentPath}' imports '${localBinding}' from '@stalk-ui/utils' ` +
            `but no lib provides it. Add it to registry/lib/utils-exports.ts.`,
        )
      }
      const entry = byLib.get(lib.name) ?? { targetPath: lib.filePath, names: [] }
      entry.names.push(importName)
      byLib.set(lib.name, entry)
    }

    return [...byLib.values()]
      .map(
        ({ targetPath, names }) =>
          `import ${typeKeyword}{ ${names.join(', ')} } from '${relativeSpecifier(
            componentPath,
            targetPath,
          )}'`,
      )
      .join('\n')
  })

// Components import shared component-internal modules (e.g. `./tones`) via a
// relative specifier for local dev. Rewrite that to the copied lib path so the
// installed component resolves the file the CLI drops in `src/lib/stalk-ui/`.
const rewriteComponentLibImports = (source: string, componentPath: string): string => {
  let result = source
  for (const lib of COMPONENT_LIBS) {
    if (componentPath === lib.filePath) continue
    const pattern = new RegExp(`(from\\s+['"])${lib.sourceSpecifier}(['"])`, 'g')
    result = result.replace(pattern, `$1${relativeSpecifier(componentPath, lib.filePath)}$2`)
  }
  return result
}

const inlineFile = (file: RegistryFile, sourcePath: string): RegistryFile => {
  const raw = readFileSync(join(rootDirectory, sourcePath), 'utf8')
  const rewritten = rewriteComponentLibImports(rewriteStalkUtilsImports(raw, file.path), file.path)
  const content = sourceNeedsUseClient(rewritten) ? `${useClientDirective}${rewritten}` : rewritten
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
  // Anchor the header immediately after the first complete import statement so it
  // survives the shadcn CLI's import-rewriting pass — comments in the directive
  // prologue (above the imports) are stripped when the CLI re-emits the file,
  // while comments adjacent to imports are preserved. The statement may span
  // multiple lines (e.g. a multiline named import), so match through its
  // terminating `from '...'` rather than a single physical line; fall back to a
  // single line for bare side-effect imports that have no `from` clause.
  const importMatch =
    /^import\b[\s\S]*?from\s+['"][^'"]+['"];?\n/m.exec(content) ??
    /^import\b[^\n]*\n/m.exec(content)

  if (importMatch === null) {
    return `${shadcnCompatibilityHeader}\n${content}`
  }

  const insertionPoint = importMatch.index + importMatch[0].length
  return `${content.slice(0, insertionPoint)}${shadcnCompatibilityHeader}\n${content.slice(
    insertionPoint,
  )}`
}

// Stalk's internal lib files (e.g. `tones`, `create-style-context`) live at
// `src/lib/stalk-ui/*`. The native registry resolves them via `registryDependencies`
// against Stalk's own registry, but the shadcn CLI resolves a *bare* dependency
// name against ITS registry (ui.shadcn.com) — where these names don't exist (404).
// So for the shadcn variant, inline each lib file directly into the component and
// drop it from `registryDependencies`. Component→component deps stay as bare names
// (shadcn resolves the ones it has, e.g. `spinner`).
const libFileByName = new Map<string, { filePath: string; sourcePath: string }>(
  [...STALK_UTILS_LIBS, ...COMPONENT_LIBS].map((lib) => [
    lib.name,
    { filePath: lib.filePath, sourcePath: lib.sourcePath },
  ]),
)

const addShadcnHeader = (file: RegistryFile): RegistryFile => ({
  ...file,
  content: file.content === undefined ? undefined : withShadcnCompatibilityHeader(file.content),
})

const toShadcnItem = (item: RegistryItem): RegistryItem => {
  const inlinedLibFiles: RegistryFile[] = []
  const registryDependencies: string[] = []

  for (const dependency of item.registryDependencies) {
    const lib = libFileByName.get(dependency)
    if (lib === undefined) {
      registryDependencies.push(dependency)
      continue
    }
    inlinedLibFiles.push(inlineFile({ path: lib.filePath, type: 'registry:lib' }, lib.sourcePath))
  }

  return {
    ...item,
    files: [...item.files, ...inlinedLibFiles].map(addShadcnHeader),
    registryDependencies,
  }
}

rimrafSync(registryDirectory)
mkdirSync(shadcnDirectory, { recursive: true })

const manifests: RegistryIndex['manifests'] = {}

// Lib items (shared helpers) are emitted alongside components. They carry the
// same per-variant fan-out so `registryDependencies` resolve for every
// `primitives` setting, and a shadcn-compat copy so mixed registries work.
for (const item of [...registryItems, ...registryLibs]) {
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
