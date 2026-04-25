import { z } from 'zod'

export const schemaVersion = '1.0'
export const registryItemSchemaUrl = 'https://stalk-ui.dev/schema/v1/registry-item.json'

export const registryFileSchema = z.object({
  path: z.string().min(1),
  type: z.enum(['registry:ui', 'registry:lib', 'registry:hook']),
  content: z.string().optional(),
  sourcePath: z.string().optional(),
})

export const registryItemSchema = z.object({
  $schema: z.literal(registryItemSchemaUrl).default(registryItemSchemaUrl),
  name: z.string().min(1),
  type: z.enum(['registry:ui', 'registry:lib', 'registry:hook']),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(registryFileSchema).min(1),
  stalk: z.object({
    schemaVersion: z.literal(schemaVersion),
    preset: z.object({
      semanticTokens: z.record(z.string(), z.unknown()).default({}),
      recipes: z.array(z.string()).default([]),
    }),
    packageDependencies: z.object({
      preset: z.literal('@stalk-ui/preset'),
      i18n: z.literal('@stalk-ui/i18n').optional(),
    }),
    pandaCodegen: z.boolean().default(true),
    importAliases: z.object({
      styledSystem: z.string().default('styled-system'),
    }),
  }),
})

export const registryIndexSchema = z.object({
  schemaVersion: z.literal(schemaVersion),
  generatedAt: z.string(),
  manifests: z.record(
    z.string(),
    z.object({
      path: z.string(),
      sha256: z.string(),
    }),
  ),
})

export type RegistryFile = z.infer<typeof registryFileSchema>
export type RegistryItem = z.infer<typeof registryItemSchema>
export type RegistryIndex = z.infer<typeof registryIndexSchema>
