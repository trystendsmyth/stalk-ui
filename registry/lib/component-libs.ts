// Shared, component-internal modules that several components import via a relative
// specifier in source (for local dev) but which must be distributed as a copyable
// lib file. build-registry rewrites the source specifier to the copied lib path,
// check-registry-deps enforces the matching `registryDependencies` entry, and
// registry/lib emits the lib manifest — mirroring the `@stalk-ui/utils` libs.
export interface ComponentLib {
  /** Registry item name; also the `registryDependencies` entry components use. */
  name: string
  /** Target path written into the consumer project. */
  filePath: string
  /** Source file inlined at build time. */
  sourcePath: string
  /** The relative specifier used in component source (rewritten on build). */
  sourceSpecifier: string
}

export const TONES_LIB: ComponentLib = {
  name: 'tones',
  filePath: 'src/lib/stalk-ui/tones.ts',
  sourcePath: 'packages/components/src/tones.ts',
  sourceSpecifier: './tones',
}

export const COMPONENT_LIBS: ComponentLib[] = [TONES_LIB]

export const componentLibBySpecifier = new Map<string, ComponentLib>(
  COMPONENT_LIBS.map((lib) => [lib.sourceSpecifier, lib]),
)

export const componentLibNames = new Set(COMPONENT_LIBS.map((lib) => lib.name))
