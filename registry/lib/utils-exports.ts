// Single source of truth mapping `@stalk-ui/utils` exports to the copyable lib
// files the CLI installs. build-registry.ts uses it to rewrite util imports to
// relative paths and emit the lib manifests; check-registry-deps.ts uses it to
// enforce that a component importing a util declares the providing lib in
// `registryDependencies`. Components import from the workspace package for local
// dev; that import is rewritten to the copied file for distribution.

export interface StalkUtilLib {
  // Registry item name; also the `registryDependencies` entry components use.
  name: string
  // Target path written into the consumer project.
  filePath: string
  // Source file inlined at build time.
  sourcePath: string
  // Named exports this lib file provides.
  exports: string[]
  // npm dependencies the lib file needs (beyond React, which is a given).
  dependencies: string[]
}

export const STALK_UTILS_LIBS: StalkUtilLib[] = [
  {
    name: 'create-style-context',
    filePath: 'src/lib/stalk-ui/create-style-context.tsx',
    sourcePath: 'packages/utils/src/create-style-context.tsx',
    exports: ['createStyleContext'],
    dependencies: [],
  },
]

export const stalkUtilLibByExport = new Map<string, StalkUtilLib>(
  STALK_UTILS_LIBS.flatMap((lib) => lib.exports.map((exportName) => [exportName, lib] as const)),
)

export const stalkUtilLibNames = new Set(STALK_UTILS_LIBS.map((lib) => lib.name))
