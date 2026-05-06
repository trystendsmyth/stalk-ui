export type PackageManager = 'pnpm' | 'yarn' | 'npm' | 'bun'

export type Variant = 'radix' | 'base'

export interface GlobalOptions {
  codegen?: boolean
  config?: string
  dryRun?: boolean
  force?: boolean
  registry?: string
  verbose?: boolean
  workspace?: string
}

export interface StalkConfig {
  $schema: string
  preset: '@stalk-ui/preset'
  components: string
  utils: string
  styledSystem: string
  registries: Record<string, string>
  packageManager?: PackageManager
  // Primitive backend used to resolve component manifests. Defaults to `radix`
  // when omitted; non-default variants resolve to `<registry>/<variant>/<name>`.
  primitives?: Variant
}

export interface RegistryFile {
  path: string
  type: 'registry:ui' | 'registry:lib' | 'registry:hook'
  content: string
}

export interface RegistryItem {
  $schema: string
  name: string
  type: 'registry:ui' | 'registry:lib' | 'registry:hook'
  dependencies: string[]
  registryDependencies: string[]
  files: RegistryFile[]
  stalk: {
    schemaVersion: string
    preset: {
      semanticTokens: Record<string, unknown>
      recipes: string[]
    }
    packageDependencies: {
      preset: '@stalk-ui/preset'
      i18n?: '@stalk-ui/i18n' | undefined
    }
    pandaCodegen: boolean
    importAliases: {
      styledSystem: string
    }
  }
}
