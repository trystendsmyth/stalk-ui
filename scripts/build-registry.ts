import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { format } from 'prettier'

import { registryIndexSchema, registryItemSchema, schemaVersion } from '../registry/schema'
import { registryItems } from '../registry/ui'

import type { RegistryFile, RegistryIndex, RegistryItem } from '../registry/schema'

const rootDirectory = process.cwd()
const publicDirectory = join(rootDirectory, 'public')
const registryDirectory = join(publicDirectory, 'r')
const shadcnDirectory = join(registryDirectory, 'shadcn')
const generatedAt = process.env.STALK_REGISTRY_GENERATED_AT ?? '1970-01-01T00:00:00.000Z'

const stableJson = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex')
const shadcnCompatibilityHeader =
  '// Stalk UI component - requires PandaCSS setup and @stalk-ui/preset.'

const writeJson = async (path: string, value: unknown) => {
  mkdirSync(dirname(path), { recursive: true })
  const content = await format(stableJson(value), { parser: 'json' })
  writeFileSync(path, content)
  return content
}

const inlineFile = (file: RegistryFile): RegistryFile => {
  if (file.sourcePath === undefined) {
    return file
  }

  const content = readFileSync(join(rootDirectory, file.sourcePath), 'utf8')
  const { sourcePath: _sourcePath, ...serializableFile } = file

  return {
    ...serializableFile,
    content,
  }
}

const toSerializableItem = (item: RegistryItem): RegistryItem => {
  const parsed = registryItemSchema.parse(item)

  return {
    ...parsed,
    files: parsed.files.map(inlineFile),
  }
}

const withShadcnCompatibilityHeader = (content: string) => {
  const firstNewline = content.indexOf('\n')

  if (firstNewline === -1) {
    return `${shadcnCompatibilityHeader}\n${content}`
  }

  return `${content.slice(0, firstNewline + 1)}${shadcnCompatibilityHeader}\n${content.slice(
    firstNewline + 1,
  )}`
}

const toShadcnItem = (item: RegistryItem): RegistryItem => ({
  ...item,
  files: item.files.map((file) => ({
    ...file,
    content: file.content === undefined ? undefined : withShadcnCompatibilityHeader(file.content),
  })),
})

rmSync(registryDirectory, { force: true, recursive: true })
mkdirSync(shadcnDirectory, { recursive: true })

const manifests: RegistryIndex['manifests'] = {}

for (const item of registryItems) {
  const nativeItem = toSerializableItem(item)
  const shadcnItem = registryItemSchema.parse(toShadcnItem(nativeItem))
  const nativePath = join(registryDirectory, `${nativeItem.name}.json`)
  const shadcnPath = join(shadcnDirectory, `${nativeItem.name}.json`)
  const nativeContent = await writeJson(nativePath, nativeItem)
  const shadcnContent = await writeJson(shadcnPath, shadcnItem)

  manifests[nativeItem.name] = {
    path: `/r/${nativeItem.name}.json`,
    sha256: sha256(nativeContent),
  }
  manifests[`shadcn/${nativeItem.name}`] = {
    path: `/r/shadcn/${nativeItem.name}.json`,
    sha256: sha256(shadcnContent),
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
