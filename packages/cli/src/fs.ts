import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'

export const pathExists = async (path: string) => {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

export const readTextIfExists = async (path: string) =>
  (await pathExists(path)) ? readFile(path, 'utf8') : undefined

export const readJsonIfExists = async <T>(path: string) => {
  const raw = await readTextIfExists(path)
  return raw === undefined ? undefined : (JSON.parse(raw) as T)
}

export const writeText = async (path: string, content: string) => {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, content)
}

export const writeJson = async (path: string, value: unknown) =>
  writeText(path, `${JSON.stringify(value, null, 2)}\n`)

export const toProjectPath = (root: string, path: string) =>
  isAbsolute(path) ? path : resolve(root, path)

export const toRelativeProjectPath = (root: string, path: string) => {
  const value = relative(root, path)
  return value.length === 0 ? '.' : value
}

export const backupFile = async (root: string, backupRoot: string, path: string) => {
  const content = await readTextIfExists(path)

  if (content === undefined) {
    return
  }

  await writeText(join(backupRoot, toRelativeProjectPath(root, path)), content)
}
