import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

export const snapshotPaths = (paths: string[]) => {
  const snapshot = new Map<string, string>()

  for (const path of paths) {
    if (!existsSync(path)) {
      continue
    }

    const stat = statSync(path)

    if (stat.isDirectory()) {
      for (const entry of readdirSync(path)) {
        for (const [key, value] of snapshotPaths([join(path, entry)])) {
          snapshot.set(key, value)
        }
      }
    } else {
      snapshot.set(relative(process.cwd(), path), readFileSync(path, 'utf8'))
    }
  }

  return snapshot
}

export const assertNoGeneratedDrift = (before: Map<string, string>, after: Map<string, string>) => {
  const changedPaths = new Set([...before.keys(), ...after.keys()])
  const drift = [...changedPaths].filter((path) => before.get(path) !== after.get(path))

  if (drift.length > 0) {
    throw new Error(
      `Generated files are out of date:\n${drift.map((path) => `- ${path}`).join('\n')}`,
    )
  }
}
