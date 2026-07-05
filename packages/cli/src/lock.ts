// Post-install component tracking: `.stalk-ui/lock.json` records what `add`
// installed (per component: manifest URL + file hashes) and `.stalk-ui/base/`
// keeps a pristine copy of each installed file in consumer-space (imports
// already rewritten). Together they give `upgrade` a real merge base and
// `drift` something to compare against — commit the directory.

import { createHash } from 'node:crypto'
import { join } from 'node:path'

import { readJsonIfExists, readTextIfExists, writeJson, writeText } from './fs'

export const lockSchemaUrl = 'https://stalk-ui.com/schema/v1/lock.json'
export const lockSchemaVersion = '1.0'

const lockDirectory = '.stalk-ui'

export interface LockedFile {
  path: string
  sha256: string
}

export interface LockedComponent {
  files: LockedFile[]
  url: string
}

export interface LockFile {
  $schema: string
  schemaVersion: string
  components: Record<string, LockedComponent>
}

export const sha256 = (value: string) => createHash('sha256').update(value).digest('hex')

export const emptyLock = (): LockFile => ({
  $schema: lockSchemaUrl,
  schemaVersion: lockSchemaVersion,
  components: {},
})

const lockPath = (root: string) => join(root, lockDirectory, 'lock.json')

export const basePath = (root: string, filePath: string) =>
  join(root, lockDirectory, 'base', filePath)

export const readLock = async (root: string): Promise<LockFile> =>
  (await readJsonIfExists<LockFile>(lockPath(root))) ?? emptyLock()

export const writeLock = async (root: string, lock: LockFile) => {
  const components = Object.fromEntries(
    Object.entries(lock.components).sort(([a], [b]) => a.localeCompare(b)),
  )
  await writeJson(lockPath(root), { ...lock, components })
}

export const readBaseSnapshot = async (root: string, filePath: string) =>
  readTextIfExists(basePath(root, filePath))

export const writeBaseSnapshot = async (root: string, filePath: string, content: string) =>
  writeText(basePath(root, filePath), content)

export interface InstalledFile {
  content: string
  path: string
}

/** Record a component install: lock entry plus pristine base snapshots. */
export const recordComponent = async (
  root: string,
  lock: LockFile,
  name: string,
  url: string,
  files: InstalledFile[],
) => {
  for (const file of files) {
    await writeBaseSnapshot(root, file.path, file.content)
  }

  lock.components[name] = {
    files: files
      .map((file) => ({ path: file.path, sha256: sha256(file.content) }))
      .sort((a, b) => a.path.localeCompare(b.path)),
    url,
  }
}
